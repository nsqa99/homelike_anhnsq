class PaypalService
  def initialize
    client_id = ENV["PAYPAL_CLIENT_ID_SANDBOX"]
    client_secret = ENV["PAYPAL_CLIENT_SECRET_SANDBOX"]
    environment = PayPal::SandboxEnvironment.new client_id, client_secret
    @client = PayPal::PayPalHttpClient.new environment
  end

  def create_payment_for order
    request = PayPalCheckoutSdk::Orders::OrdersCreateRequest::new
    request.headers["prefer"] = "return=representation"
    request.request_body({
      intent: "CAPTURE",
      application_context: {
        return_url: PAYPAL_RETURN_URL,
        shipping_preference: "NO_SHIPPING"
      },
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.total_paid
          }
        }
      ]
    })
    
    response = @client.execute request
    payment = Payment.new
    payment.price = order.total_paid
    payment.token = response.result.id
    payment.order = order
    payment.customer = order.customer
    
    return { token: response.result.id, links: response.result.links[1].href } if payment.save
  end
  
  def approve_payment order
    request = PayPalCheckoutSdk::Orders::OrdersCaptureRequest::new(order.payment.token)
    request.headers["prefer"] = "return=representation"

    begin
      response = @client.execute request
      if response.result.status == "COMPLETED"
        order.update_attribute(:status, 1) # set order as paid
        order.payment.toggle!(:paid) # set payment as paid
        
        { status: response.result.status }
      else
        order.update_attribute(:status, 2) # postponed
        
        false
      end
    rescue PayPalHttp::HttpError => ioe
      {status: ioe.status_code, details: ioe.result.details}
    end
  end
  
  def make_payout_for(payment, receiver)
    payout = Payout.new
    payout.payment = payment
    payout.total = payment.price * (1 - DEFAULT_PLATFORM_AFFILIATE_RATE.to_f)

    response = request_create_payout(payment.id, payout.total, receiver)
    
    if response[:status] == :ok && payout.save
      payout.update_attribute(:status, 1) # 1 is paid

      { response: response }
    end
  end
  
  def request_create_payout payment_id, amount, receiver
    random_hex = RandomService.hex_random
    body = {
      sender_batch_header: {
          recipient_type: "EMAIL",
          email_message: "Dear merchant, this is your HomeLike payout",
          sender_batch_id: "HomeLikePayout#{payment_id}#{receiver}",
          email_subject: "HomeLike Payout for merchant #{receiver}"
      },
      items: [{
        note: "HomeLike payout $#{amount}",
        amount: {
            currency: "USD",
            value: amount
        },
        receiver: receiver,
        sender_item_id: "Payout-#{random_hex}"
      }]
    }

    request = PaypalPayoutsSdk::Payouts::PayoutsPostRequest.new
    request.request_body(body)
    
    begin
      response = @client.execute(request)
      {status: :ok, data: response.result.batch_header.payout_batch_id}
    rescue PayPalHttp::HttpError => ioe
      {status: ioe.status_code, details: ioe.result.details}
    end
  end
end
