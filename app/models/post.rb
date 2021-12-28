class Post < ApplicationRecord
  include Searchable
  belongs_to :user
  
  has_one :active_share, class_name: "Sharing",
    foreign_key: "parent_id", dependent: :destroy, inverse_of: :parent
  
  has_many :passive_shares, class_name: "Sharing",
    foreign_key: "child_id", dependent: :destroy, inverse_of: :child
  
  has_one :child, through: :active_share, source: :child
  has_many :parents, through: :passive_shares, source: :parent

  has_and_belongs_to_many :items

  before_destroy :delete_posts_items_association

  has_many_attached :images
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  def image_urls
    self.images.map(&:url)
  end

  def self.popular_posts
    Post.order(likes_count: :desc, shares_count: :desc, id: :desc).page(1).per(3)
  end

  def owner
    {username: self.user.username, user_full_name: self.user.user_full_name}
  end

  def like_users
    self.likes.map do |like|
      user = like.user
      
      {
        username: user.username, 
        full_name: user.user_full_name, 
        avatar: user.avatar
      }
    end
  end

  after_save {
    __elasticsearch__.index_document
  }

  after_destroy {
    __elasticsearch__.delete_document
  }

  def as_indexed_json(options = {})
    as_json(
      only: [:content, :likes_count, :shares_count, :comments_count],
      methods: [:image_urls],
      include: {
        child: {
          only: [:id, :content, :likes, :shares],
          methods: [:image_urls]
        },
        items: {
          only: [:rate, :status, :price, :initial_start_date, :initial_end_date],
          include: {
            merchant: {
              include: {
                user: {
                  only: [:username, :status],
                  methods: [:user_full_name]
                }
              }
            },
            tags: {
              only: [:title, :type]
            },
            apartment: {
              only: [:title, :size, :initial_quantity, :initial_allowance, :max_allowance,
                :extra_fee_each_person],
              methods: [:image_urls],
              include: {
                rent_address: {
                  only: [:home_number, :street, :ward, :district, :city, :country]
                },
                apartments_facilities: {
                  only: [:quality, :quantity],
                  methods: [:facility_name]
                }
              }
            }
          }
        }
      }
    )
  end

  private

  def delete_posts_items_association
    self.items.delete_all
    self.parents.delete_all
  end
end
