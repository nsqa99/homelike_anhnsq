class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :following_count, :follower_count, :status,
    :user_full_name, :avatar_url, :follower_users, :following_users
  
  def follower_users
    object.followers.map do |follower|
      {id: follower.id, avatar: follower.avatar_url, user_full_name: follower.user_full_name}
    end
  end

  def following_users
    object.following.map do |following|
      {id: following.id, avatar: following.avatar_url, user_full_name: following.user_full_name}
    end
  end
end
