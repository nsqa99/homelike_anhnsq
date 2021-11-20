class RemoveItemApartmentReferences < ActiveRecord::Migration[6.1]
  def change
    change_table :items do |t|
      t.remove_references :apartment
    end
  end
end
