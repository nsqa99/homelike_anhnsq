class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.string :home_number
      t.string :street
      t.string :ward
      t.string :district
      t.string :city
      t.string :country

      t.timestamps
      t.belongs_to :user
    end
  end
end
