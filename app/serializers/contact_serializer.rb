class ContactSerializer < ActiveModel::Serializer
  attributes :phone_number, :facebook_url, :twitter_url
end
