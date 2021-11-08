class CreateRefreshTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :refresh_tokens do |t|
      t.string :token, null: false
      t.references :user, null: false, foreign_key: true
    end
  end
end
