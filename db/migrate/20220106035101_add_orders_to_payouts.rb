class AddOrdersToPayouts < ActiveRecord::Migration[6.1]
  def change
    add_reference :payouts, :order, index: true, foreign_key: true
  end
end
