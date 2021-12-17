class ApartmentsFacility < ApplicationRecord
  belongs_to :apartment
  belongs_to :facility

  def facility_name
    facility.name
  end
end
