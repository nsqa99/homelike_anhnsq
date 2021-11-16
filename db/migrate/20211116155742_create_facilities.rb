class CreateFacilities < ActiveRecord::Migration[6.1]
  def change
    create_table :facilities do |t|
      t.references :apartment, null: false, foreign_key: true
      t.string :name, null: false
      t.string :quality, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
  end
end
