class AddIndexToUserLike < ActiveRecord::Migration[6.1]
  def change
    add_index :likes, [:post_id, :user_id], :unique =>  true
  end
end
