class Api::V1::OrdersController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:create, :index, :show]

  def create
    order = @current_user.customer.orders.build(new_order_params)
    item_id = params[:item_id]
    item = Item.approved.find(item_id)
      
    return json_response([], :bad_request, message: "Item must be approved") unless item

    order.item = item
    order.merchant = item.merchant

    if order.save
      json_response(serialize(order, with_children))
    else
      json_response([], :bad_request, message: order.errors.full_messages.to_sentence)
    end
  end

  def show
    order = Order.find(params[:id])

    json_response(serialize(order, with_children))
  end

  def update
    order = Order.find(params[:id])

    if order.update(update_order_params)
      json_response(serialize(order, with_children))
    else
      json_response([], :bad_request, message: order.errors.full_messages.to_sentence)
    end
  end

  def destroy
    order = Order.not_postponed.find(params[:id])
    order.update_attribute(:status, 2) # Deleted = 2

    json_response(serialize(order, with_children))
  end

  private

  def new_order_params
    params.require(:order).permit(:customer_quantity, :start_rent_date, :end_rent_date, :item_id)
  end
  
  def update_order_params
    params.require(:order).permit(:customer_quantity, :status, :start_rent_date, :end_rent_date)
  end

  def with_children
    ["item", "item.apartment"]
  end
end
