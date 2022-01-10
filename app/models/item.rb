class Item < ApplicationRecord
  include Searchable

  enum status: {
    approved: 0,
    deleted: 1
  }, _prefix: true


  delegate :title, to: :apartment, prefix: true

  belongs_to :merchant
  has_one :apartment, dependent: :destroy
  has_many :items_tags
  has_many :tags, through: :items_tags
  has_and_belongs_to_many :posts
  has_many :orders
  has_many :reviews, dependent: :destroy

  accepts_nested_attributes_for :apartment, :tags

  before_destroy :delete_items_tags_association, :delete_items_posts_association

  scope :approved, -> { where(status: 0)}

  after_save {
    __elasticsearch__.index_document
  }

  def as_indexed_json(options = {})
    as_json(
      only: [:id, :rate, :status, :price, :initial_start_date, :initial_end_date, :description],
      methods: [:disabled_dates],
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
              only: [:home_number, :street, :ward, :district, :city, :country, :latitude, :longitude]
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

  def available_dates update_order = nil
    availables = (initial_start_date.to_date..initial_end_date.to_date).to_a
    orders.not_postponed.each do |order|
      next if order.id == update_order.try(:id)
      availables -= (order.start_rent_date.to_date..order.end_rent_date.to_date).to_a
    end

    availables
  end

  def disabled_dates
    (initial_start_date.to_date..initial_end_date.to_date).to_a - available_dates
  end

  def similar_items
    page = 1
    page_size = 3
    search_fields = ["apartment.rent_address.city", "apartment.rent_address.country",
      "apartment.rent_address.district"]
    search_text = "#{self.apartment.rent_address.district} #{self.apartment.rent_address.city} #{self.apartment.rent_address.country}"
    sort = [["rate", "desc"]]
    filter = [{"op" => "not", "field" => "id", "value" => self.id}, {"op" => "not", "field" => "status", "value" => "deleted"}]
    items, total = Item.build_search(search_text, filter, sort, search_fields, page, page_size)

    items.map{|item| item["_source"]}
  end

  def calculate_rating
    total_reviews = self.reviews.count
    cal_rate = self.reviews.sum(&:rate)
    new_rate = (cal_rate / total_reviews).floor

    self.rate = new_rate
    self.save
  end

  private

  def delete_items_tags_association
    self.tags.delete_all
  end

  def delete_items_posts_association
    self.posts.delete_all
  end
end
