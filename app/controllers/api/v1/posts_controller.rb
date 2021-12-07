class Api::V1::PostsController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:index, :show]
  skip_load_and_authorize_resource only: [:create, :index, :show, :like_post]

  before_action :validate_user, only: [:create]

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
      post.child << shared
    end

    if post.save
      shared.try(:increment!, :shares)

      json_response(serialize(post))
    else
      error_json_response(post)
    end
  end

  def show
    post = Post.find(params[:id])

    json_response(serialize(post))
  end

  def update
    post = Post.find(params[:id])

    if post.update(new_post_params)
      json_response(serialize(post))
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
    post = Post.find(params[:id])
    post.increment!(:likes)

    json_response([], :ok)
  end

  private

  def new_post_params
    params.require(:post).permit(:content, post_images_attributes: [:url])
  end

  def with_children; end

  def error_json_response(post)
    json_response([], :bad_request,
      message: post.errors.full_messages.to_sentence)
  end

  def validate_user
    user_id = params[:merchant_id] || params[:customer_id]
    @current_user = User.find_by!(username: user_id)
    
    return json_response([], :forbidden) if @current_user != current_user
  end
end
