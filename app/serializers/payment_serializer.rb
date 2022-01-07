class PaymentSerializer < ActiveModel::Serializer
  attributes :token, :price, :paid

  has_one :payment
end
