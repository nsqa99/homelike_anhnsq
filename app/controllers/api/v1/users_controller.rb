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

  private

  def pagination_decorator
    @pagination_decorator ||= PaginationDecorator.new
  end
end
