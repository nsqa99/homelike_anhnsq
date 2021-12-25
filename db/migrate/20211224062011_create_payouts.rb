class CreatePayouts < ActiveRecord::Migration[6.1]
  def change
    create_table :payouts do |t|
      t.references :payment, null: false, foreign_key: true
      t.float :total, null: false
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
