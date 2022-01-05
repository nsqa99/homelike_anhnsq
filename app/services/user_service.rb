class UserService
  # def refresh_tokens user
  # end

  def get_list_users page, page_size
    User.build_search("", [], [], [], page, page_size)
  end

  def get_one username
    User.find_by(username: username)
  end

  def follow follower, followed
    followed_user = User.find_by!(username: followed)
    return false if follower.following.include?(followed_user)

    ActiveRecord::Base.transaction do
      follower.following << followed_user
      follower.increment!(:following_count)
      followed_user.increment!(:follower_count)
    end

    followed_user
  end

  def unfollow unfollower, unfollowed
    unfollowed_user = User.find_by!(username: unfollowed)
    return false unless unfollower.following.include?(unfollowed_user)

    ActiveRecord::Base.transaction do
      unfollower.following.delete(unfollowed_user)
      unfollower.decrement!(:following_count)
      unfollowed_user.decrement!(:follower_count)
    end

    unfollowed_user
  end

  def search search_text, filters, sort, search_fields, page, page_size
    User.build_search(search_text, filters, sort, search_fields, page, page_size)
  end
end
