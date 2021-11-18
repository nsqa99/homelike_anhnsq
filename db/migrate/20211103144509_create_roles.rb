class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.string :role_title, null: false

      t.timestamps
    end
  end
end
