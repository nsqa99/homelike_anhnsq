class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :following_count, :follower_count

  has_one :address
  has_one :customer
  has_one :merchant
end
