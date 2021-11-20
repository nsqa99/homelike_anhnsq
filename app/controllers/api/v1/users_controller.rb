class Api::V1::UsersController < ApplicationController
  authorize_resource

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    users = User.page(page).per(page_size)
    json_response(
      serialize(users),
      paginate(page, page_size, users.total_pages, users.total_count)
    )
  end

  def update; end
  def destroy; end

  private

  def pagination_decorator
    @pagination_decorator ||= PaginationDecorator.new
  end
end
