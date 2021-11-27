class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :likes, :shares

  has_many :post_images
  has_one :child, serializer: PostSerializer
  has_many :items
end
