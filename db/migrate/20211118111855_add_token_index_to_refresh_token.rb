class AddTokenIndexToRefreshToken < ActiveRecord::Migration[6.1]
  def change
    add_index :refresh_tokens, :token, unique: true
  end
end
