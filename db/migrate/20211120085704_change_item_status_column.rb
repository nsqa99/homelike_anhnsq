class ChangeItemStatusColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :items, :status, :integer, null: false, default: 0
  end
end
