class Api::V1::ReviewsController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:index, :show]

  def index
    page = params[:page] || DEFAULT_PAGE
    page_size = params[:page_size] || DEFAULT_PAGE_SIZE

    reviews = review_service.get_list_reviews_by_item(params[:item_id], page, page_size)

    json_response(
      serialize(reviews),
      pagination: paginate(page, page_size, reviews.total_pages, reviews.total_count)
    )
  end

  def create
    review = review_service.create(@current_user, params[:item_id], new_review_params)

    if review
      json_response(serialize(review))
    else
      json_response([], :bad_request, message: review.errors.full_messages.to_sentence)
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review
      json_response(serialize(review))
    else
      json_response([], :bad_request, message: review.errors.full_messages.to_sentence)
    end
  end

  private

  def new_review_params
    params.require(:review).permit(:content, :rate)
  end

  def review_service
    @review_service ||= ReviewService.new
  end
end
