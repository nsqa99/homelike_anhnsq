class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.references :merchant, null: false, foreign_key: true
      t.references :apartment, null: false, foreign_key: true
      t.string :title, null: false
      t.float :rate, null: false, default: 0.0
      t.string :status, null: false
      t.float :min_price, null: false, default: 0.0
      t.float :max_price, null: false, default: 0.0

      t.timestamps
    end
  end
end
