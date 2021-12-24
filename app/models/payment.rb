class Payment < ApplicationRecord
  belongs_to :order
  belongs_to :customer
  has_one :payout
end
