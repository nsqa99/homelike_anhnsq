class Apartment < ApplicationRecord
  belongs_to :item
  has_many :apartments_facilities, dependent: :destroy
  has_many :facilities, through: :apartments_facilities
  has_one :rent_address, dependent: :destroy
  has_many :images, dependent: :destroy

  accepts_nested_attributes_for :rent_address, :apartments_facilities, :images
end
