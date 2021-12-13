class RemoveApartmentFromFacilities < ActiveRecord::Migration[6.1]
  def change
    remove_reference :facilities, :apartment, null: false, foreign_key: true
  end
end
