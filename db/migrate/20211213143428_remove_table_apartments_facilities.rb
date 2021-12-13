class RemoveTableApartmentsFacilities < ActiveRecord::Migration[6.1]
  def change
    drop_table :apartments_facilities
  end
end
