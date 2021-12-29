class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :likes_count, :shares_count, :image_urls, :owner,
    :created_at, :like_users, :comments_count

  has_one :child, serializer: PostSerializer
  has_many :items
end
