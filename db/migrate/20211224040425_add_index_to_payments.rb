class AddIndexToPayments < ActiveRecord::Migration[6.1]
  def change
    add_index :payments, :order_id, unique: true, name: "unique"
  end
end
