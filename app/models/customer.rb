class Customer < ApplicationRecord
  belongs_to :user
  has_many :orders

  delegate :username, to: :user, allow_nil: true
end
