class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :url
      t.references :apartment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
