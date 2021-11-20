class Item < ApplicationRecord
  enum status: {
    pending: 0,
    approved: 1,
    deleted: 2
  }, _prefix: true

  belongs_to :merchant
  has_one :apartment, dependent: :destroy
  has_and_belongs_to_many :tags

  accepts_nested_attributes_for :apartment
end
