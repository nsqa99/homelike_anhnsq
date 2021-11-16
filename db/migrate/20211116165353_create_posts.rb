class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.text :content, null: false
      t.references :user, null: false, foreign_key: true
      t.integer :likes, null: false, default: 0
      t.integer :shares, null: false, default: 0

      t.timestamps
    end
  end
end
