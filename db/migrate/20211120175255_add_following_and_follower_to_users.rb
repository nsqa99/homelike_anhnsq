class AddFollowingAndFollowerToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :following, :integer, null: false, default: 0
    add_column :users, :follower, :integer, null: false, default: 0
  end
end
