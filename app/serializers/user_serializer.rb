class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  has_one :address
  has_one :customer
  has_one :merchant
end
