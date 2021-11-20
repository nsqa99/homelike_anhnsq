class RemoveApartmentMerchantReferences < ActiveRecord::Migration[6.1]
  def change
    change_table :apartments do |t|
      t.remove_references :merchant
    end
  end
end
