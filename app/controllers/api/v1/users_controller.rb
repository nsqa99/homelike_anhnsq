class Api::V1::UsersController < ApplicationController
  authorize_resource

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    users = User.page(page).per(page_size)
    json_response(
      json_decorator.array_json(users),
      pagination_decorator.paginate(page, page_size, users.total_pages, users.total_count)
    )
  end

  def update; end
  def destroy; end

  private

  def json_decorator
    @json_decorator ||= JsonDecorator.new
  end

  def pagination_decorator
    @pagination_decorator ||= PaginationDecorator.new
  end
end
