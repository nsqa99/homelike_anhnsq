class Api::V1::UsersController < ApplicationController
  authorize_resource
  skip_before_action :authenticate_request_token, only: [:show, :search]
  skip_authorize_resource only: [:show, :search]

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    users, total = user_service.get_list_users(page, page_size)

    json_response(
      serialize(user_decorator.transform_list(users)),
      paginate(page, page_size, (total.to_f / page_size.to_f).ceil, total)
    )
  end

  def show
    username = params[:id]
    user = user_service.get_one(username)

    json_response(serialize(user), :ok)
  end

  def follow
    followed_user = params[:followed]
    response = user_service.follow(current_user, followed_user)
    return json_response([], :bad_request) if !response
    
    json_response({
      follower: serialize(current_user),
      followed: serialize(response)}, :ok)
  end
  
  def unfollow
    unfollowed_user = params[:unfollowed]
    response = user_service.unfollow(current_user, unfollowed_user)
    return json_response([], :bad_request) if !response

    json_response({
      unfollower: serialize(current_user),
      unfollowed: serialize(response)}, :ok)
  end

  def search
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    
    search_fields = params[:fields] || all_search_fields
    search_text = params[:search_text]
    filters = params[:filters]
    sort = params[:sort]
    
    users, total = user_service.search(search_text, filters, sort, search_fields, page, page_size)
    
    json_response(
      serialize(user_decorator.transform_list(users)),
      pagination: paginate(page, page_size, (total.to_f / page_size.to_f).ceil, total)
    )
  end

  def destroy
    user = user_service.destroy(params[:id])

    json_response(user["_source"])
  end

  private

  def user_decorator
    @user_decorator ||= Elasticsearch::UserDecorator.new
  end

  def user_service
    @user_service ||= UserService.new
  end

  def all_search_fields
    ["username", "email", "user_full_name", "full_name.first_name", "full_name.last_name"]
  end
end
