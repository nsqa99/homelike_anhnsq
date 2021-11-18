class AddSecureTokenIndexToAdmin < ActiveRecord::Migration[6.1]
  def change
    add_index :admins, :secure_token, unique: true
  end
end
