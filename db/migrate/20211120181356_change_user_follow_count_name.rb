class ChangeUserFollowCountName < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :following, :following_count
    rename_column :users, :follower, :follower_count
  end
end
