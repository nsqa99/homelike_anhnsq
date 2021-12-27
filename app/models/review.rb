class Review < ApplicationRecord
  belongs_to :item
  belongs_to :user
  after_create :update_item_rate

  def owner
    user = self.user
    
    {fullname: user.user_full_name, username: user.username, avatar: user.avatar_url}
  end

  def update_item_rate
    self.item.calculate_rating
  end
end
