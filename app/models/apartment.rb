class Apartment < ApplicationRecord
  belongs_to :merchant
  belongs_to :item
  has_many :facilities, dependent: :destroy
  has_many :rent_addresses, dependent: :destroy
end
