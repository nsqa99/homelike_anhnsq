class Order < ApplicationRecord
  enum status: {
    pending: 0,
    paid: 1,
    postponed: 2
  }, _prefix: true

  belongs_to :customer
  belongs_to :merchant
  belongs_to :item
  has_one :payment
  
  scope :not_postponed, -> { where(status: [0, 1])}
  scope :pending, -> { where(status: 0)}
  scope :paid, -> { where(status: 1)}

  before_save :check_rent_date, if: ->{start_rent_date_changed? && end_rent_date_changed?}
  before_save :check_quantity, if: :customer_quantity_changed?

  private

  def calculate_total
    self.total = (self.end_rent_date.to_date - self.start_rent_date.to_date).to_i * self.item.price
  end

  def check_rent_date
    if (start_rent_date > end_rent_date || start_rent_date < self.item.initial_start_date ||
      end_rent_date > self.item.initial_end_date || !rent_with_available_dates?)
      
      raise bad_request("Rent date not valid")
    end
  end

  def check_quantity
    raise bad_request("Quantity exceeds max allowance") if self.customer_quantity > self.item.apartment.max_allowance

    if self.customer_quantity > self.item.apartment.initial_allowance
      self.extra_price = (self.customer_quantity - self.item.apartment.initial_allowance) * self.item.apartment.extra_fee_each_person
    end
  end

  def bad_request message
    ActionController::BadRequest.new(message)
  end

  def rent_with_available_dates?
    checking_range = (self.start_rent_date.to_date..self.end_rent_date.to_date).to_a
    
    (checking_range & self.item.available_dates).size == checking_range.size
  end
end
