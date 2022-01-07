class OrderService
  def create customer, item, params
    order = customer.orders.build(params)
    order.item = item
    order.merchant = item.merchant

    return order if order.save
    false
  end

  def get_list_orders_by_user user, page, page_size, paid
    if paid
      user.orders.paid.order(id: :desc).page(page).per(page_size)
    else
      user.orders.order(id: :desc).page(page).per(page_size)
    end
  end

  def get_one user, order_id
    user.customer.orders.find(order_id)
  end

  def get_one_by_item_and_user item_id, user
    item = Item.approved.find(item_id)
    user.orders.pending.find_by(item: item)
  end

  def postpone order_id
    order = Order.not_postponed.find(order_id)
    order.update_attribute(:status, 2) # Deleted = 2

    order
  end

  def update order_id, params
    order = Order.find(order_id)

    return order if order.update(params)
    false
  end
end
