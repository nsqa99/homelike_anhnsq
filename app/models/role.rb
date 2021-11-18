class Role < ApplicationRecord
  has_and_belongs_to_many :users

  DEFAULT_ROLES.each do |role|
    define_singleton_method role.to_sym do
      self.find_by(title: role)
    end
  end
end
