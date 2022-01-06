class Api::V1::CommentsController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:index, :show]

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    comments = comment_service.get_list_comments_by_post(params[:post_id], page, page_size)

    json_response(
      serialize(comments),
      pagination: paginate(page, page_size, comments.total_pages, comments.total_count)
    )
  end

  def create
    comment = comment_service.create(@current_user, params[:post_id], new_comment_params)

    if comment
      json_response(serialize(comment))
    else
      json_response([], :bad_request, message: comment.errors.full_messages.to_sentence)
    end
  end

  def destroy
    comment = comment_service.destroy(params[:id])

    if comment
      json_response(serialize(comment))
    else
      json_response([], :bad_request, message: comment.errors.full_messages.to_sentence)
    end
  end

  private

  def new_comment_params
    params.require(:comment).permit(:content, :rate)
  end

  def comment_service
    @comment_service ||= CommentService.new
  end
end
