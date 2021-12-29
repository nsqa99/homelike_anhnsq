class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :owner, :created_at, :post_id
end
