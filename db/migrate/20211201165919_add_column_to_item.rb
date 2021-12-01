class AddColumnToItem < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :initial_start_date, :datetime, null: false, default: Date.current
    add_column :items, :initial_end_date, :datetime, null: false, default: 30.days.from_now
  end
end
