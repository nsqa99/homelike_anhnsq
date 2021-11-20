class AddApartmentToItem < ActiveRecord::Migration[6.1]
  def change
    add_reference :apartments, :item, foreign_key: true
  end
end
