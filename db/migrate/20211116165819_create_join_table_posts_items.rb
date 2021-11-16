class CreateJoinTablePostsItems < ActiveRecord::Migration[6.1]
  def change
    create_join_table :posts, :items do |t|
      t.index [:post_id, :item_id], unique: true
      # t.index [:item_id, :post_id]
    end
  end
end
