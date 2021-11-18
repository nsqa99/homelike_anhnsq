class CreateAdminRefreshTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :admin_refresh_tokens do |t|
      t.string :token, null: false
      t.integer :status, null: false, default: 0
      t.references :admin, null: false, foreign_key: true

      t.timestamps
    end
  end
end
