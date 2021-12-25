class AddDescriptionToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :description, :string, null: false, limit: 500
  end
end
