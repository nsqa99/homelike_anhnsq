class AddIndexToApartmentTitle < ActiveRecord::Migration[6.1]
  def change
    add_index :apartments, :title
  end
end
