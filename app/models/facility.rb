class Facility < ApplicationRecord
  has_many :apartments_facilities, dependent: :destroy
  has_many :apartments, through: :apartments_facilities
  has_and_belongs_to_many :tags
end
