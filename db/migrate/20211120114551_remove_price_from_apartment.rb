class RemovePriceFromApartment < ActiveRecord::Migration[6.1]
  def change
    remove_column :apartments, :price_per_day
  end
end
