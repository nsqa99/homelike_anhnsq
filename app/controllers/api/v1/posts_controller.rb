class Api::V1::PostsController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:create, :index, :show, :like_post]
  authorize_resource only: [:create]

  # before_action :validate_user, only: [:create]

  def create
    post = @current_user.posts.build(new_post_params)

    # Attach Item to post

    if (item_ids = params[:item_ids])
      items = Item.where(id: item_ids).approved
      
      if items.count < item_ids.count
        return json_response([], :bad_request, message: "Item must be approved")
      end

      post.items.concat(items)
    end

    # Share posts

    if (shared_id = params[:shared_id])
      shared = Post.find(shared_id)
      post.child = shared
    end

    if post.save
      if shared.present?
        shared.try(:increment!, :shares)
        shared.__elasticsearch__.update_document
      end
      
      json_response(serialize(post, with_children))
    else
      error_json_response(post)
    end
  end

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    username = params[:user_id]

    posts = if username
      User.find(username: owner).posts.order(id: :desc).page(page).per(page_size)
    else
      Post.order(id: :desc).page(page).per(page_size)
    end

    json_response(
      serialize(posts, with_children),
      pagination: paginate(page, page_size, posts.total_pages, posts.total_count)
    )
  end

  def show
    post = Post.find(params[:id])

    json_response(serialize(post, with_children))
  end

  def update
    post = Post.find(params[:id])

    if post.update(new_post_params)
      json_response(serialize(post, with_children))
    else
      error_json_response(post)
    end
  end

  def destroy
    post = Post.find(params[:id])
    
    if post.destroy
      json_response([], :ok)
    else
      error_json_response(post)
    end
  end

  def like_post
    post = Post.find(params[:post_id])
    post.increment!(:likes)
    post.__elasticsearch__.update_document

    json_response([], :ok)
  end

  private

  def new_post_params
    params.require(:post).permit(:content, images: [])
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
