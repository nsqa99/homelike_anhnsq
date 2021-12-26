class Review < ApplicationRecord
  belongs_to :item
  belongs_to :user

  def owner
    user = self.user
    
    {fullname: user.user_full_name, username: user.username, avatar: user.avatar_url}
  end
end
