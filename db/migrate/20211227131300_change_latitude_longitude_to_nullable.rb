class ChangeLatitudeLongitudeToNullable < ActiveRecord::Migration[6.1]
  def change
    change_column :rent_addresses, :latitude, :string, null: true
    change_column :rent_addresses, :longitude, :string, null: true

  end
end
