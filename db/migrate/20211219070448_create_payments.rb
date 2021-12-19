class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.boolean :paid
      t.string :token
      t.float :price
      t.references :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
