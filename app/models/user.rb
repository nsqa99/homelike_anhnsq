class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :address
  has_and_belongs_to_many :roles
  has_many :refresh_tokens

  DEFAULT_ROLES = %w(admin customer merchant)

  DEFAULT_ROLES.each do |role|
    define_method :"#{role}?" do
      self.roles.pluck(:title).include?(role)
    end
  end
end
