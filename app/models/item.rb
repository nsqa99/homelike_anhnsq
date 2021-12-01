class Item < ApplicationRecord
  enum status: {
    pending: 0,
    approved: 1,
    deleted: 2
  }, _prefix: true

  delegate :title, to: :apartment, prefix: true

  belongs_to :merchant
  has_one :apartment, dependent: :destroy
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :posts

  accepts_nested_attributes_for :apartment

  before_destroy :delete_items_tags_association, :delete_items_posts_association

  scope :approved, -> { where(status: 1)}
  scope :not_deleted, -> { where(status: [0, 1])}

  private

  def delete_items_tags_association
    self.tags.delete_all
  end

  def delete_items_posts_association
    self.posts.delete_all
  end
end
