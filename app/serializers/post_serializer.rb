class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :likes, :shares, :image_urls, :owner, :created_at

  has_one :child, serializer: PostSerializer
  has_many :items
end
