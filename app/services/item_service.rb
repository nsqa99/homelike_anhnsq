class ItemService
  def create merchant, params
    item = merchant.items.build(params)

    return item if item.save
    false
  end

  def get_list_items_by_merchant merchant, page, page_size
    merchant.items.approved.order(id: :desc).page(page).per(page_size)
  end

  def get_one item_id
    Item.approved.find(item_id)
  end

  def destroy item_id
    item = Item.approved.find(item_id)
    item.update_attribute(:status, 1) # Deleted = 1

    item
  end

  def update item_id, params
    item = Item.approved.find(item_id)
    if item.apartment.apartment_images.attached? && !params[:apartment_attributes][:apartment_images]
      params[:apartment_attributes][:apartment_images] = item.apartment.apartment_images.map(&:blob)
    end

    return item if item.update(params)
    false
  end

  def search search_text, filters, sort, search_fields, page, page_size
    Item.build_search(search_text, filters, sort, search_fields, page, page_size)
  end
end
