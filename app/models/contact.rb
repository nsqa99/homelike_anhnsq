class Contact < ApplicationRecord
  belongs_to :user

  validates :phone_number, length: {maximum: 10}, format: { with: /[0-9]/ }
end
