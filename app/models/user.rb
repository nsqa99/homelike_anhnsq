class User < BaseModel
  include Searchable

  enum status: {
    active: 0,
    deleted: 1
  }, _prefix: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :address, dependent: :destroy
  has_one :full_name, dependent: :destroy
  has_and_belongs_to_many :roles

  before_destroy :delete_user_roles_association

  has_many :refresh_tokens, dependent: :destroy
  has_one :customer, dependent: :destroy
  has_one :merchant, dependent: :destroy
  has_many :posts, dependent: :destroy
  
  has_many :following_relationships, class_name: "Relationship",
    foreign_key: "follower_id", dependent: :destroy
  
  has_many :being_followed_relationships, class_name: "Relationship",
    foreign_key: "followed_id", dependent: :destroy
  
  has_many :following, through: :following_relationships, source: :followed
  has_many :followers, through: :being_followed_relationships, source: :follower

  accepts_nested_attributes_for :address, :customer, :merchant
  validates_confirmation_of :password

  DEFAULT_ROLES.each do |role|
    define_method "#{role}?" do
      self.roles.pluck(:title).include?(role)
    end
  end

  def as_indexed_json(options = {})
    as_json(
      only: [:username, :created_at, :cache_all_earned_commission, :status, :email, 
        :following_count, :follower_count],
      include: {
        full_name: {
          only: [:first_name, :last_name],
          methods: [:full_name]
        },
        address: {
          only: [:home_number, :street, :ward, :district, :city, :country]
        }
      }
    )
  end

  # Override
  def role_titles
    self.roles.pluck(:title)
  end
  
  # Override
  def identity
    self.id
  end

  private

  def delete_user_roles_association
    self.roles.delete_all
  end
end
