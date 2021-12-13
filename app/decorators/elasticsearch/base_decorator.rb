class Elasticsearch::BaseDecorator
  def transform_list list
    # TODO: Abstract
    raise NotImplementedError
  end
end
