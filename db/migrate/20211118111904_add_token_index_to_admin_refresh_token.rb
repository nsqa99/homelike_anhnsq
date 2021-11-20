class AddTokenIndexToAdminRefreshToken < ActiveRecord::Migration[6.1]
  def change
    add_index :admin_refresh_tokens, :token, unique: true
  end
end
