class CreateJoinTableOrdersItems < ActiveRecord::Migration[6.1]
  def change
    create_join_table :orders, :items do |t|
      t.index [:order_id, :item_id], unique: true
      t.index :item_id
      t.index :order_id
    end
  end
end
