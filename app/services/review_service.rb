class ReviewService
  def create user, item_id, params
    review = user.reviews.build(params)
    review.item = Item.approved.find(item_id)

    return review if review.save
    
    false
  end

  def get_list_reviews_by_item item_id, page, page_size
    item = Item.approved.find(item_id)

    item.reviews.page(page).per(page_size)
  end

  def get_one review_id
  end

  def destroy review_id
    review = Review.find(review_id)

    return review if review.destroy
  end

  def update review_id, params
  end
end
