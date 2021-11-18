class Admin < ApplicationRecord
  devise :database_authenticatable, :recoverable, :validatable
  alias_attribute :refresh_tokens, :admin_refresh_tokens

  has_many :admin_refresh_tokens, dependent: :destroy

  ADMIN_ROLES.each do |role|
    define_method "role_#{role}?" do
      self.role == role
    end
  end
end
