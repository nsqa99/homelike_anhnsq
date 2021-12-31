class OrderSerializer < ActiveModel::Serializer
  attributes :id, :total, :start_rent_date, :end_rent_date, :created_at, :status,
    :customer_quantity, :extra_price, :total_paid

  belongs_to :item
  belongs_to :customer
  has_one :payment
end
