class ApartmentsFacility < ApplicationRecord
  belongs_to :apartment
  belongs_to :facility
end
