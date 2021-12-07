class ItemSerializer < ActiveModel::Serializer
  attributes :id, :rate, :price, :initial_start_date, :initial_end_date, :status

  has_one :apartment
end
