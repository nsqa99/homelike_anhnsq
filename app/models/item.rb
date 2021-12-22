class Item < ApplicationRecord
  include Searchable

  enum status: {
    approved: 0,
    deleted: 1
  }, _prefix: true


  delegate :title, to: :apartment, prefix: true

  belongs_to :merchant
  has_one :apartment, dependent: :destroy
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :posts
  has_many :orders

  accepts_nested_attributes_for :apartment

  before_destroy :delete_items_tags_association, :delete_items_posts_association

  scope :approved, -> { where(status: 0)}

  after_save {
    unless status_deleted?
      __elasticsearch__.index_document
    else
      __elasticsearch__.delete_document(refresh: true)
    end
  }

  def as_indexed_json(options = {})
    as_json(
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
    )
  end

  def available_dates
    availables = (initial_start_date.to_date..initial_end_date.to_date).to_a
    orders.each do |order|
      availables -= (order.start_rent_date.to_date..order.end_rent_date.to_date).to_a
    end

    availables
  end

  private

  def delete_items_tags_association
    self.tags.delete_all
  end

  def delete_items_posts_association
    self.posts.delete_all
  end
end
