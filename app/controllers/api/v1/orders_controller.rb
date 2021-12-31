class Api::V1::OrdersController < ApplicationController
  load_and_authorize_resource

  # skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:create]

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

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    orders = @current_user.customer.orders.order(id: :desc).page(page).per(page_size)

    json_response(
      serialize(orders, with_children),
      pagination: paginate(page, page_size, orders.total_pages, orders.total_count)
    )
  end

  def index_for_merchant
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    orders = @current_user.merchant.orders.order(id: :desc).page(page).per(page_size)

    json_response(
      serialize(orders, with_children),
      pagination: paginate(page, page_size, orders.total_pages, orders.total_count)
    )
  end

  def show
    order = @current_user.customer.orders.find(params[:id])

    json_response(serialize(order, with_children))
  end

  def get_one_by_item_and_customer
    item_id = Item.approved.find(params[:item_id])
    order = @current_user.customer.orders.pending.find_by(item_id: item_id)

    if order
      json_response(serialize(order, with_children))
    else
      json_response([], :not_found)
    end
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
    params.require(:order).permit(:total, :extra_price, :total_paid, :customer_quantity, :start_rent_date, :end_rent_date, :item_id)
  end
  
  def update_order_params
    params.require(:order).permit(:customer_quantity, :status, :start_rent_date, :end_rent_date)
  end

  def with_children
    ["item", "item.apartment","item.apartment.rent_address"]
  end
end
