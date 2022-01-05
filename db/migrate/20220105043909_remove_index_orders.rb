class RemoveIndexOrders < ActiveRecord::Migration[6.1]
  def change
    remove_index :orders, name: :index_orders_on_start_rent_date_and_end_rent_date
  end
end
