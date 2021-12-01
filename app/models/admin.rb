class Admin < BaseModel
  devise :database_authenticatable, :recoverable, :validatable
  alias_attribute :refresh_tokens, :admin_refresh_tokens

  has_many :admin_refresh_tokens, dependent: :destroy

  ADMIN_ROLES.each do |role|
    define_method "role_#{role}?" do
      self.role == role
    end
  end

  # Override
  def role_titles
    [] << self.role
  end

  # Override
  def identity
    self.secure_token
  end
end
