class Customer < ApplicationRecord
  belongs_to :user

  delegate :username, to: :user, allow_nil: true
end
