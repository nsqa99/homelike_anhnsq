class RemovePaymentsFromPayouts < ActiveRecord::Migration[6.1]
  def change
    remove_reference :payouts, :payment
  end
end
