class PayoutSerializer < ActiveModel::Serializer
  attributes :id, :total, :status
end
