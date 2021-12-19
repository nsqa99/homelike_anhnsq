class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :following_count, :follower_count, :status

  has_one :address
  has_one :customer
  has_one :merchant
  has_one :contact
end
