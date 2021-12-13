class DropApartmentsTagsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :apartments_tags
  end
end
