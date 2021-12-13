class BaseModel < ApplicationRecord
  self.abstract_class = true

  def role_titles
    # TODO: Abstract
    raise NotImplementedError
  end
  
  def identity
    # TODO: Abstract
    raise NotImplementedError
  end
end
