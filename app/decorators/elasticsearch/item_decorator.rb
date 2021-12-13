class Elasticsearch::ItemDecorator < Elasticsearch::BaseDecorator
  def transform_list items
    items.map do |raw_item|
      raw_item["_source"]
    end
  end
end
