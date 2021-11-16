class CreateApartments < ActiveRecord::Migration[6.1]
  def change
    create_table :apartments do |t|
      t.string :title, null: false
      t.integer :size, null: false
      t.float :price_per_day, null: false
      t.integer :initial_quantity, null: false
      t.integer :initial_allowance, null: false
      t.integer :max_allowance, null: false
      t.float :extra_fee_each_person, null: false
      t.belongs_to :merchant, null: false

      t.timestamps
    end
  end
end
