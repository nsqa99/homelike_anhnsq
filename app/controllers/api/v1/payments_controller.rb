class Api::V1::PaymentsController < ApplicationController
  load_and_authorize_resource :order
  before_action :validate_user, only: [:create, :complete]

  def create
    order = Order.not_postponed.find(params[:order_id])
    result = paypal_service.create_payment_for order

    if result
      return json_response(result)
    end
    
    json_response([], :bad_request, message: "Payment process failed. Please try again later")
  end

  def complete
    order = Order.find(params[:order_id])

    if order.payment
      result = paypal_service.approve_payment(order)
      
      return json_response(result) if result
    end

    json_response([], :bad_request, message: "Payment process failed. Please try again later")
  end

  def payout
    order = Order.find(params[:order_id])
    if order.payment.try(:paid)
      result = paypal_service.make_payout_for(order)
      
      return json_response(order.payout) if result
    end

    json_response([], :bad_request, message: "Payout process failed. Please try again later")
  end

  private

  def paypal_service
    @paypal_service ||= PaypalService.new
  end

  def validate_user
    @current_user = User.find_by!(username: params[:customer_id])
    
    return json_response([], :forbidden) if @current_user != current_user
  end
end
