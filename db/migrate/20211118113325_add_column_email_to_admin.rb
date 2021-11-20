class AddColumnEmailToAdmin < ActiveRecord::Migration[6.1]
  def change
    add_column :admins, :email, :string, null: false, unique: true
  end
end
