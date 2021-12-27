class ChangeWardToNullable < ActiveRecord::Migration[6.1]
  def change
    change_column :rent_addresses, :ward, :string, null: true
  end
end
