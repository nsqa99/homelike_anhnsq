class AddExtraPriceToOrder < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :extra_price, :float, default: 0.0
  end
end
