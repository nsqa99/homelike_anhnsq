class Api::V1::PostsController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:create, :index, :show]
  authorize_resource only: [:create]

  # before_action :validate_user, only: [:create]

  def create
    post = post_service.create(@current_user, new_post_params, params[:item_ids], params[:shared_id])

    if post
      json_response(serialize(post, with_children))
    else
      error_json_response(post)
    end
  end

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    username = params[:user_id]

    posts = post_service.get_list_posts(username, page, page_size)

    json_response(
      {
        list: serialize(posts, with_children),
        popular_posts: serialize(Post.popular_posts, with_children)
      },
      pagination: paginate(page, page_size, posts.total_pages, posts.total_count)
    )
  end

  def show
    post = post_service.get_one(params[:id])

    json_response(serialize(post, with_children))
  end

  def update
    post = post_service.update(params[:id], new_post_params)

    if post
      json_response(serialize(post, with_children))
    else
      error_json_response(post)
    end
  end

  def destroy
    post = post_service.destroy(params[:id])

    if post
      json_response(serialize(post, with_children), :ok)
    else
      error_json_response(post)
    end
  end

  def like_post
    post = post_service.like_post(@current_user, params[:post_id])

    if post
      return json_response(serialize(post, with_children), :ok)
    end
    
    json_response([], :bad_request)
  end

  def unlike_post
    post = post_service.unlike_post(@current_user, params[:post_id])

    if post
      return json_response(serialize(post, with_children), :ok)
    end
    
    json_response([], :bad_request)
  end

  private

  def new_post_params
    params.require(:post).permit(:content, images: [])
  end

  def post_service
    @post_service ||= PostService.new
  end

  def with_children
    ["items", "items.apartment", "items.apartment.rent_address", 
      "items.apartment.facilities", "items.apartment.apartments_facilities"]
  end

  def error_json_response(post)
    json_response([], :bad_request,
      message: post.errors.full_messages.to_sentence)
  end
end
