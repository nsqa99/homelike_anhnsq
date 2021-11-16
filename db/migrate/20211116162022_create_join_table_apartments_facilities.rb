class CreateJoinTableApartmentsFacilities < ActiveRecord::Migration[6.1]
  def change
    create_join_table :apartments, :facilities do |t|
      t.index [:apartment_id, :facility_id], unique: true
      # t.index [:facility_id, :apartment_id]
    end
  end
end
