class Tag < ApplicationRecord
  has_many :items_tags
  has_many :items, through: :items_tags
end
