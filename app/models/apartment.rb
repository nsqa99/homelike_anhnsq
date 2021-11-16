class Apartment < ApplicationRecord
  belongs_to :merchant
  belongs_to :item
  has_many :facilities
  has_many :rent_addresses
end
