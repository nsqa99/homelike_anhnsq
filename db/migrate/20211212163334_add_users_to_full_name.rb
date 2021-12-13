class AddUsersToFullName < ActiveRecord::Migration[6.1]
  def change
    add_reference :full_names, :user, index: true
    add_foreign_key :full_names, :users
  end
end
