class ItemSerializer < ActiveModel::Serializer
  attributes :id, :rate, :price, :initial_start_date, :initial_end_date, :status, :owner,
    :similar_items

  has_one :apartment

  def owner
    user = object.merchant.user
    {fullname: user.user_full_name, username: user.username}
  end
end
