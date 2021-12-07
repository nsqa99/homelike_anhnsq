class CreateOrderItemReference < ActiveRecord::Migration[6.1]
  def change
    add_reference :orders, :item, index: true
    add_foreign_key :orders, :items
  end
end
