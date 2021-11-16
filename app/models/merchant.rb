class Merchant < ApplicationRecord
  has_many :items, dependent: :destroy
  has_many :apartments, dependent: :destroy
  belongs_to :user
end
