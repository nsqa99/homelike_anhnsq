class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :address, dependent: :destroy
  has_and_belongs_to_many :roles
  has_many :refresh_tokens, dependent: :destroy
  has_one :customer, dependent: :destroy
  has_one :merchant, dependent: :destroy
  has_many :posts, dependent: :destroy
  
  has_many :following_relationships, class_name: "Relationship",
    foreign_key: "follower_id", dependent: :destroy
  
  has_many :being_followed_relationships, class_name: "Relationship",
    foreign_key: "followed_id", dependent: :destroy

  DEFAULT_ROLES = %w(admin customer merchant)

  DEFAULT_ROLES.each do |role|
    define_method :"#{role}?" do
      self.roles.pluck(:title).include?(role)
    end
  end
end
