class DropJoinTable < ActiveRecord::Migration[6.1]
  def change
    drop_join_table :orders, :items
  end
end
