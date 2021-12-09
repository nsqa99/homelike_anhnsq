class Elasticsearch::UserDecorator
  def transform_list users
    users.map do |raw_user|
      raw_user["_source"]
    end
  end
end
