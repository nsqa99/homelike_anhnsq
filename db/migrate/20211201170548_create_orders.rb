class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :customer, null: false, foreign_key: true
      t.float :total, null: false
      t.datetime :start_rent_date, null: false
      t.datetime :end_rent_date, null: false

      t.timestamps
    end
  end
end
