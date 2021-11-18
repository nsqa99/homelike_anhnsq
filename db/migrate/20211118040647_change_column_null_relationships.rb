class ChangeColumnNullRelationships < ActiveRecord::Migration[6.1]
  def change
    change_column :relationships, :follower_id, :bigint, null: false
    change_column :relationships, :followed_id, :bigint, null: false
  end
end
