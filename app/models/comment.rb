class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  def owner
    user = self.user
    
    {fullname: user.user_full_name, username: user.username, avatar: user.avatar_url}
  end
end
