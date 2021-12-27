class Api::V1::ItemsController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:show, :search]
  skip_load_and_authorize_resource only: [:create, :show, :search]

  def create
    item = @current_user.merchant.items.build(new_item_params)    
    if item.save
      json_response(serialize(item, with_children))
    else
      json_response([], :bad_request, message: item.errors.full_messages.to_sentence)
    end
  end

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    items = @current_user.merchant.items.order(id: :desc).page(page).per(page_size)

    json_response(
      serialize(items, with_children),
      pagination: paginate(page, page_size, items.total_pages, items.total_count)
    )
  end

  def show
    item = Item.find(params[:id])

    json_response(serialize(item, with_children))
  end

  def update
    item = Item.find(params[:id])

    if item.update(update_item_params)
      json_response(serialize(item, with_children))
    else
      json_response([], :bad_request, message: item.errors.full_messages.to_sentence)
    end
  end

  def destroy
    item = Item.approved.find(params[:id])
    item.update_attribute(:status, 1) # Deleted = 1

    json_response(serialize(item, with_children))
  end

  def search
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    
    search_fields = params[:fields] || all_search_fields
    search_text = params[:search_text]
    filters = params[:filters] ? params[:filters].map{|item| JSON.parse(item)} : []
    sort = params[:sort] ? params[:sort].map{|item| item.is_a?(Array) ? item : JSON.parse(item)} : [["id", "desc"]]
    items, total = Item.build_search(search_text, filters, sort, search_fields, page, page_size)

    json_response(
      serialize(item_decorator.transform_list(items)),
      pagination: paginate(page, page_size, (total.to_f / page_size.to_f).ceil, total)
    )
  end

  private

  def new_item_params
    params.require(:item).permit(:price, :initial_start_date, :description,
      :initial_end_date, apartment_attributes: [:title, :size, :initial_quantity,
        :initial_allowance, :max_allowance, :extra_fee_each_person,
        rent_address_attributes: [:home_number, :street, :ward, :district, :city, :country,
          :latitude, :longitude], apartments_facilities_attributes: [:quality, :quantity, :facility_id],
        apartment_images: []
      ]
    )
  end
  
  def update_item_params
    params.require(:item).permit(:rate, :status, :price, :initial_start_date, :description,
      :initial_end_date, apartment_attributes: [:id, :title, :size, :initial_quantity,
        :initial_allowance, :max_allowance, :extra_fee_each_person, :item_id,
        rent_address_attributes: [:home_number, :street, :ward, :district, :city, :country,
          :latitude, :longitude], apartments_facilities_attributes: [:id, :quality, :quantity, :facility_id],
          apartment_images: []
      ]
    )
  end

  def with_children
    ["apartment", "apartment.rent_address", "apartment.facilities", "apartment.apartments_facilities"]
  end

  def all_search_fields
    ["description", "status", "merchant.user.username", "apartment.rent_address.city", "apartment.rent_address.country",
      "apartment.rent_address.district", "merchant.user.user_full_name", "tags.title", "apartment.title"]
  end

  def item_decorator
    @item_decorator ||= Elasticsearch::UserDecorator.new
  end
end
