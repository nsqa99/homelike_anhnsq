class AddDefaultValueToItemInitialQuantity < ActiveRecord::Migration[6.1]
  def change
    change_column :apartments, :initial_quantity, :integer, null: false, default: 1
  end
end
