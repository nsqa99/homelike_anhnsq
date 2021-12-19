class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :phone_number
      t.string :facebook_url
      t.string :twitter_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
