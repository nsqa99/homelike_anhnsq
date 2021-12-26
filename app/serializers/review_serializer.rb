class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rate, :owner, :created_at, :item_id
end
