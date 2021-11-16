class CreateJoinTableApartmentsTags < ActiveRecord::Migration[6.1]
  def change
    create_join_table :apartments, :tags do |t|
      t.index [:apartment_id, :tag_id], unique: true
      # t.index [:tag_id, :apartment_id]
    end
  end
end
