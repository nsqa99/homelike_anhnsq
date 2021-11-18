class AdminRefreshToken < ApplicationRecord
  enum status: {
    active: 0,
    expired: 1
  }, _prefix: true
  
  belongs_to :admin

  validates :token, presence: true, uniqueness: true
  validates :admin, presence: true

  scope :active, ->{ status_active }
end
