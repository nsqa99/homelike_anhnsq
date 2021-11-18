class ChangeAdminsTypeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :admins, :type, :role
  end
end
