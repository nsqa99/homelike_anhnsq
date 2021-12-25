class AddDefaultValueToPaymentPaid < ActiveRecord::Migration[6.1]
  def change
    change_column :payments, :paid, :boolean, null: false, default: false
  end
end
