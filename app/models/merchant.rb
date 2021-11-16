class Merchant < ApplicationRecord
  has_many :items
  has_many :apartments
  belongs_to :user
end
