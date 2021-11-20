class Api::V1::ItemsController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:index, :show]

  delegate :title, to: :apartment, prefix: true

  def create
    merchant = Merchant.joins(:user).find_by!(user: {username: params[:id]})
    item = merchant.items.build(new_item_params)

    if item.save
      json_response(serialize(item, with_children))
    else
      json_response([], :bad_request, message: item.errors.full_messages.to_sentence)
    end
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
    item = Item.find(params[:id])
    item.update_attribute(:status, 2) # Deleted = 2

    json_response(serialize(item, with_children))
  end

  private

  def new_item_params
    params.require(:item).permit(:rate, :status, :min_price, :max_price,
      apartment_attributes: [:title, :size, :initial_quantity,
        :initial_allowance, :max_allowance, :extra_fee_each_person,
        rent_address_attributes: [:home_number, :street, :ward, :district, :city, :country,
          :latitude, :longitude], facilities_attributes: [:name, :quality, :quantity],
        images_attributes: [:url]
      ]
    )
  end
  
  def update_item_params
    params.require(:item).permit(:rate, :status, :min_price, :max_price,
      apartment_attributes: [:id, :title, :size, :initial_quantity,
        :initial_allowance, :max_allowance, :extra_fee_each_person, :item_id,
        rent_address_attributes: [:home_number, :street, :ward, :district, :city, :country,
          :latitude, :longitude], facilities_attributes: [:id, :name, :quality, :quantity],
        images_attributes: [:id, :url]
      ]
    )
  end

  def with_children
    ["apartment", "apartment.rent_address", "apartment.facilities", "apartment.images"]
  end
end
