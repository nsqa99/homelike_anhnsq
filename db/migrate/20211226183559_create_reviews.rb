class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :content, null: false, limit: 200
      t.integer :rate, null: false, max: 5
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
