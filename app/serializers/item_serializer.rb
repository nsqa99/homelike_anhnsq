class ItemSerializer < ActiveModel::Serializer
  attributes :id, :rate, :status, :min_price, :max_price, :status

  has_one :apartment
end
