class ChangeLikeNamePost < ActiveRecord::Migration[6.1]
  def change
    rename_column :posts, :likes, :likes_count
    rename_column :posts, :shares, :shares_count
  end
end
