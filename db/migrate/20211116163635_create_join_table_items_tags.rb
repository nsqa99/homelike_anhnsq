class CreateJoinTableItemsTags < ActiveRecord::Migration[6.1]
  def change
    create_join_table :items, :tags do |t|
      t.index [:item_id, :tag_id], unique: true
      # t.index [:tag_id, :item_id]
    end
  end
end
