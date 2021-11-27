class Sharing < ApplicationRecord
  belongs_to :parent, class_name: "Post"
  belongs_to :child, class_name: "Post"

  before_destroy :decrease_sharing_count_on_child_post

  private

  def decrease_sharing_count_on_child_post
    self.child.decrement!(:shares)
  end
end
