class RefreshToken < ApplicationRecord
  enum status: {
    active: 0,
    expired: 1
  }, _prefix: true
  
  belongs_to :user

  validates :token, presence: true, uniqueness: true
  validates :user, presence: true

  scope :active, ->{ status_active }
end
