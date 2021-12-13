class CreateApartmentsFacilities < ActiveRecord::Migration[6.1]
  def change
    create_table :apartments_facilities do |t|
      t.string :quality
      t.integer :quantity
      t.references :apartment, null: false, foreign_key: true
      t.references :facility, null: false, foreign_key: true

      t.timestamps
    end

    add_index :apartments_facilities, [:apartment_id, :facility_id], unique: true
  end
end
