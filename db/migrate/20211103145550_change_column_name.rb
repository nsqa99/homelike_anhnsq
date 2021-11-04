class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    change_column_null :roles, :role_title, false
    rename_column :roles, :role_title, :title
  end
end
