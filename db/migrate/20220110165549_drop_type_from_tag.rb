class DropTypeFromTag < ActiveRecord::Migration[6.1]
  def change
    remove_column :tags, :type
  end
end
