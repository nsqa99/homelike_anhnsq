class AddUniqueIndexToOrderItem < ActiveRecord::Migration[6.1]
  def change
    add_index :orders, [:start_rent_date, :end_rent_date], unique: true
  end
end
