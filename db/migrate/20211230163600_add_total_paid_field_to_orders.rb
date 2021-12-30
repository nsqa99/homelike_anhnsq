class AddTotalPaidFieldToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :total_paid, :float, null: false, default: 0
  end
end
