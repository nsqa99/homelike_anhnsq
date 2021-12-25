class Customer < ApplicationRecord
  belongs_to :user
  has_many :orders
  has_many :payments

  delegate :username, to: :user, allow_nil: true
end
