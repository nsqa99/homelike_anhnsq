class Apartment < ApplicationRecord
  belongs_to :item
  has_many :facilities, dependent: :destroy
  has_one :rent_address, dependent: :destroy
  has_many :images, dependent: :destroy

  accepts_nested_attributes_for :rent_address, :facilities, :images
end
