class AddDefaultValueToOrderTotal < ActiveRecord::Migration[6.1]
  def change
    change_column :orders, :total, :float, null: false, default: 0.0
  end
end
