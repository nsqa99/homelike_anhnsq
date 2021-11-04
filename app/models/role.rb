class Role < ApplicationRecord
  has_and_belongs_to_many :users

  scope :admin, -> { where(:title => "admin") }
  scope :customer, -> { where(:title => "customer") }
  scope :merchant, -> { where(:title => "merchant") }
end
