class Post < ApplicationRecord
  belongs_to :user
  has_many :post_images, dependent: :destroy
  
  has_one :active_share, class_name: "Sharing",
    foreign_key: "parent_id", dependent: :destroy, inverse_of: :parent
  
  has_many :passive_shares, class_name: "Sharing",
    foreign_key: "child_id", dependent: :destroy, inverse_of: :child
  
  has_one :child, through: :active_share, source: :child
  has_many :parents, through: :passive_shares, source: :parent

  has_and_belongs_to_many :items

  accepts_nested_attributes_for :post_images

  before_destroy :delete_posts_items_association

  private

  def delete_posts_items_association
    self.items.delete_all
    self.parents.delete_all
  end
end
