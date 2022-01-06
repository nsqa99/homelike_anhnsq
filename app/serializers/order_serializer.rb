class OrderSerializer < ActiveModel::Serializer
  attributes :id, :total, :start_rent_date, :end_rent_date, :created_at, :status,
    :customer_quantity, :extra_price, :total_paid, :customer_info, :payout_status
  
  def customer_info
    object.customer.user.user_full_name
  end

  def payout_status
    object.payout.try(:status)
  end

  belongs_to :item
  has_one :payment
end
