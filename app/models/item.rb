class Item < ApplicationRecord
  belongs_to :merchant
  has_one :apartment
  has_and_belongs_to_many :tags
end
