class RentAddressSerializer < ActiveModel::Serializer
  attributes :home_number, :street, :ward, :district, :city, :country,
    :latitude, :longitude
end
