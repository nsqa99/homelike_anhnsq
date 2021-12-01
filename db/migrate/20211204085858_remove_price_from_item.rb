class RemovePriceFromItem < ActiveRecord::Migration[6.1]
  def change
    remove_column :items, :min_price
    rename_column :items, :max_price, :price
  end
end
