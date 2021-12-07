class AddCustomerQuantityToOrder < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :customer_quantity, :integer, null: false
  end
end
