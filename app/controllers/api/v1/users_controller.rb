class Api::V1::UsersController < ApplicationController
  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    users = User.page(page).per(page_size)
    json_response(ActiveModel::SerializableResource.new(users).as_json,
      pagination: {
        page: page,
        page_size: page_size,
        total_pages: users.total_pages,
        total_entries: users.total_count
      })
  end

  def show
    user = User.find_by!(username: params[:username])
    json_response(UserSerializer.new(user).as_json)
  end
end
