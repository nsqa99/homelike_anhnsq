class PaypalService
  def create_payment_for order
    request = PayPalCheckoutSdk::Orders::OrdersCreateRequest::new
    request.request_body({
      :intent => "CAPTURE",
      :purchase_units => [
        {
          :amount => {
            :currency_code => "USD",
            :value => order.total
          }
        }
      ]
    })
    
    response = @client.execute request
    payment = Payment.new
    payment.price = order.total
    payment.token = response.result.id
    payment.order = order
    
    return { token: response.result.id } if payment.save
  end
  
  def approve_payment payment
    request = PayPalCheckoutSdk::Orders::OrdersCaptureRequest::new payment.token
    response = @client.execute request
    payment.paid = response.result.status == 'COMPLETED'
    
    return { status: response.result.status } if payment.save
  end

  private
  
  def init
    client_id = ENV["PAYPAL_CLIENT_ID_SANDBOX"]
    client_secret = ENV["PAYPAL_CLIENT_SECRET_SANDBOX"]
    environment = PayPal::SandboxEnvironment.new client_id, client_secret
    @client = PayPal::PayPalHttpClient.new environment
  end
end
