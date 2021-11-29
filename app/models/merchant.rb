class Merchant < ApplicationRecord
  has_many :items, dependent: :destroy
  belongs_to :user

  delegate :username, to: :user, allow_nil: true
end
