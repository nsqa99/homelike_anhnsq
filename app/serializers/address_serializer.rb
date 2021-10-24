class AddressSerializer < ActiveModel::Serializer
  attributes :home_number, :street, :ward, :district, :city, :country
end
