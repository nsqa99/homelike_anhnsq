class CreateSharings < ActiveRecord::Migration[6.1]
  def change
    create_table :sharings do |t|
      t.bigint :child_id
      t.bigint :parent_id
    
      t.timestamps
    end

    add_index :sharings, :child_id
    add_index :sharings, :parent_id
    add_index :sharings, [:child_id, :parent_id], unique: true
  end
end
