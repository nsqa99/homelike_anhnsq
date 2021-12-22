class Apartment < ApplicationRecord
  belongs_to :item
  has_many :apartments_facilities, dependent: :destroy
  has_many :facilities, through: :apartments_facilities
  has_one :rent_address, dependent: :destroy
  has_many_attached :apartment_images

  accepts_nested_attributes_for :rent_address, :apartments_facilities

  def image_urls
    self.apartment_images.map(&:url)
  end
end
