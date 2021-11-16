class CreateRentAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :rent_addresses do |t|
      t.references :apartment, null: false, foreign_key: true
      t.string :home_number, null: false
      t.string :street, null: false
      t.string :ward, null: false
      t.string :district, null: false
      t.string :city, null: false
      t.string :country, null: false
      t.integer :latitude, null: false
      t.integer :longitude, null: false

      t.timestamps
    end
  end
end
