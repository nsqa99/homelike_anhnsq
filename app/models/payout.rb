class Payout < ApplicationRecord
  enum status: {
    pending: 0,
    paid: 1
  }, _prefix: true

  belongs_to :order

  def calculate_total_payout
    self.update_attribute(:total, self.total * (1-DEFAULT_PLATFORM_AFFILIATE_RATE.to_f))
  end
end
