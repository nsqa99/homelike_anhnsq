class AddStatusFieldToRefreshTokens < ActiveRecord::Migration[6.1]
  def change
    add_column :refresh_tokens, :status, :integer, default: 0, null: false
  end
end
