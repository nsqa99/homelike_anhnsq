class Admin < ApplicationRecord
  devise :database_authenticatable, :recoverable, :validatable

  ADMIN_ROLES.each do |role|
    define_method "role_#{role}?" do
      self.role == role
    end
  end
end
