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

  accepts_nested_attributes_for :full_name, :address, :customer, :merchant
  validates_confirmation_of :password

  delegate :first_name, to: :full_name
  delegate :last_name, to: :full_name

  DEFAULT_ROLES.each do |role|
    define_method "#{role}?" do
      self.roles.pluck(:title).include?(role)
    end
  end

  after_save {
    unless status_deleted?
      __elasticsearch__.index_document
    else
      __elasticsearch__.delete_document(refresh: true)
    end
  }

  def as_indexed_json(options = {})
    as_json(
      only: [:username, :created_at, :status, :email, :following_count, :follower_count],
      methods: [:user_full_name, :role_titles],
      include: {
        full_name: {
          only: [:first_name, :last_name]
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

  def user_full_name
    "#{first_name} #{last_name}"
  end

  private

  def delete_user_roles_association
    self.roles.delete_all
  end
end
