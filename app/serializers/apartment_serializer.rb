class ApartmentSerializer < ActiveModel::Serializer
  attributes :title, :size, :initial_quantity,
    :initial_allowance, :max_allowance, :extra_fee_each_person

  has_one :rent_address
  has_many :apartments_facilities
  has_many :images
end
