class RemoveTitleColumnFromItem < ActiveRecord::Migration[6.1]
  def change
    remove_column :items, :title
  end
end
