# frozen_string_literal: true

class DeviseCreateAdmins < ActiveRecord::Migration[6.1]
  def change
    create_table :admins do |t|
      ## Database authenticatable
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      t.string :username, null: false
      t.string :type, null: false, default: "admin"
      t.string :secure_token, null: false

      t.timestamps null: false
    end

    add_index :admins, :reset_password_token, unique: true
    add_index :admins, :username, unique: true
  end
end
