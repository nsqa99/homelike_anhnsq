class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :following_count, :follower_count, :status, :user_full_name

  has_one :address
  has_one :customer
  has_one :merchant
  has_one :contact
end
