class AddReferenceWithUserToReview < ActiveRecord::Migration[6.1]
  def change
    add_reference :reviews, :user, index: true
    add_foreign_key :reviews, :users
  end
end
