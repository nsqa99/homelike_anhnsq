class Api::V1::UsersController < ApplicationController
  authorize_resource

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    users, total = User.build_search("", [], [], [], page, page_size)

    json_response(
      serialize(user_decorator.transform_list(users)),
      paginate(page, page_size, (total / page_size.to_i).ceil, total)
    )
  end

  def follow
    followed_user = User.find_by!(username: params[:followed])

    ActiveRecord::Base.transaction do
      current_user.following << followed_user
      current_user.increment!(:following_count)
      followed_user.increment!(:follower_count)
    end
    
    json_response([], :ok)
  end
  
  def unfollow
    unfollowed_user = User.find_by!(username: params[:unfollowed])
    return json_response([], :bad_request) if !current_user.following.include?(unfollowed_user)

    ActiveRecord::Base.transaction do
      current_user.following.delete(unfollowed_user)
      current_user.decrement!(:following_count)
      unfollowed_user.decrement!(:follower_count)
    end
    
    json_response([], :ok)
  end

  def search
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    
    search_fields = params[:fields] || all_search_fields
    search_text = params[:search_text]
    filters = params[:filters]
    sort = params[:sort]
    
    users, total = User.build_search(search_text, filters, sort, search_fields, page, page_size)
    json_response(
      serialize(user_decorator.transform_list(users)),
      paginate(page, page_size, (total / page_size.to_i).ceil, total)
    )
  end

  private

  def user_decorator
    @user_decorator ||= Elasticsearch::UserDecorator.new
  end

  def all_search_fields
    ["username", "email", "user_full_name", "full_name.first_name", "full_name.last_name"]
  end
end
