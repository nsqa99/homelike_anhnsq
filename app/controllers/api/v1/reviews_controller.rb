class Api::V1::ReviewsController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:index, :show]

  def create
    review = @current_user.reviews.build(new_review_params)
    review.item = Item.approved.find(params[:item_id])

    if review.save
      json_response(serialize(review))
    else
      json_response([], :bad_request, message: review.errors.full_messages.to_sentence)
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review.destroy
      json_response(serialize(review))
    else
      json_response([], :bad_request, message: review.errors.full_messages.to_sentence)
    end
  end

  private

  def new_review_params
    params.require(:review).permit(:content, :rate)
  end
end
