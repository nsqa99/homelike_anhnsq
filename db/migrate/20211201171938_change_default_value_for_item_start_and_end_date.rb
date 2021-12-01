class ChangeDefaultValueForItemStartAndEndDate < ActiveRecord::Migration[6.1]
  def change
    change_column_default :items, :initial_start_date, nil
    change_column_default :items, :initial_end_date, nil
  end
end
