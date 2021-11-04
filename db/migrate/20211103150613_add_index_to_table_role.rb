class AddIndexToTableRole < ActiveRecord::Migration[6.1]
  def change
    add_index :roles, :title
  end
end
