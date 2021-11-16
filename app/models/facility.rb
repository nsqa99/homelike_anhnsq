class Facility < ApplicationRecord
  belongs_to :apartment
  has_and_belongs_to_many :tags
end
