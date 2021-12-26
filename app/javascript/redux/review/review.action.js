import types from "./review.type";

export const createReview = (data) => ({
  type: types.CREATE_REVIEW,
  payload: data,
});

export const destroyReview = (data) => ({
  type: types.DESTROY_REVIEW,
  payload: data,
});

export const createReviewResult = (payload) => ({
  type: types.CREATE_REVIEW_SUCCESS,
  payload,
});

export const destroyReviewResult = (payload) => ({
  type: types.DESTROY_REVIEW_SUCCESS,
  payload,
});
