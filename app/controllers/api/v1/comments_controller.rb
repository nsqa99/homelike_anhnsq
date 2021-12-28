class Api::V1::CommentsController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:index, :show]

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE
    post = Post.find(params[:post_id])

    comments = post.comments.page(page).per(page_size)

    json_response(
      serialize(comments),
      pagination: paginate(page, page_size, comments.total_pages, comments.total_count)
    )
  end

  def create
    comment = @current_user.comments.build(new_comment_params)
    comment.post = Post.find(params[:post_id])

    if comment.save
      json_response(serialize(comment))
    else
      json_response([], :bad_request, message: comment.errors.full_messages.to_sentence)
    end
  end

  def destroy
    comment = Comment.find(params[:id])

    if comment.destroy
      json_response(serialize(comment))
    else
      json_response([], :bad_request, message: comment.errors.full_messages.to_sentence)
    end
  end

  private

  def new_comment_params
    params.require(:comment).permit(:content, :rate)
  end
end
