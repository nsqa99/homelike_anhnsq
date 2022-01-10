class Api::V1::OrdersController < ApplicationController
  load_and_authorize_resource

  # skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:create]

  def create
    item = Item.approved.find(params[:item_id])
    
    return json_response([], :bad_request, message: "Item must be approved") unless item
    
    order = order_service.create(@current_user.customer, item, new_order_params)

    if order
      json_response(serialize(order, with_children))
    else
      json_response([], :bad_request, message: order.errors.full_messages.to_sentence)
    end
  end

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    orders = order_service.get_list_orders_by_user(@current_user.customer, page, page_size)

    json_response(
      serialize(orders, with_children),
      pagination: paginate(page, page_size, orders.total_pages, orders.total_count)
    )
  end

  def index_for_merchant
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    orders = order_service.get_list_orders_by_user(@current_user.merchant, page, page_size, true)

    json_response(
      serialize(orders, with_children),
      pagination: paginate(page, page_size, orders.total_pages, orders.total_count)
    )
  end

  def show
    order = order_service.get_one(@current_user, params[:id])

    json_response(serialize(order, with_children))
  end

  def get_one_by_item_and_customer
    order = order_service.get_one_by_item_and_user(params[:item_id], @current_user.customer)

    if order
      json_response(serialize(order, with_children))
    else
      json_response([], :not_found)
    end
  end

  def update
    order = order_service.update(params[:id], update_order_params)

    if order
      json_response(serialize(order, with_children))
    else
      json_response([], :bad_request, message: order.errors.full_messages.to_sentence)
    end
  end

  def destroy
    order = order_service.postpone(params[:id])

    json_response(serialize(order, with_children))
  end

  private

  def new_order_params
    params.require(:order).permit(:total, :extra_price, :total_paid, :customer_quantity, :start_rent_date, :end_rent_date, :item_id)
  end
  
  def update_order_params
    params.require(:order).permit(:total, :extra_price, :total_paid, :customer_quantity, :start_rent_date, :end_rent_date)
  end

  def order_service
    @order_service ||= OrderService.new
  end

  def with_children
    ["item", "item.apartment","item.apartment.rent_address"]
  end
end
