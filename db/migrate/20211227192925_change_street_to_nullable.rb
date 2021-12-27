class ChangeStreetToNullable < ActiveRecord::Migration[6.1]
  def change
    change_column :rent_addresses, :street, :string, null: true

  end
end
