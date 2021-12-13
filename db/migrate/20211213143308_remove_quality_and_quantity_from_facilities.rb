class RemoveQualityAndQuantityFromFacilities < ActiveRecord::Migration[6.1]
  def change
    remove_column :facilities, :quantity
    remove_column :facilities, :quality
  end
end
