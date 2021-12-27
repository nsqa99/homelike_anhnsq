import types from "./review.type";

export const getAllReview = (data, options = {}) => ({
  type: types.GET_ALL_REVIEW,
  payload: { data, options },
});

export const createReview = (data) => ({
  type: types.CREATE_REVIEW,
  payload: data,
});

export const destroyReview = (data) => ({
  type: types.DESTROY_REVIEW,
  payload: data,
});

export const getAllReviewResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess
      ? types.GET_ALL_REVIEW_SUCCESS
      : types.GET_ALL_REVIEW_FAILED,
    payload,
  };
};

export const createReviewResult = (payload) => ({
  type: types.CREATE_REVIEW_SUCCESS,
  payload,
});

export const destroyReviewResult = (payload) => ({
  type: types.DESTROY_REVIEW_SUCCESS,
  payload,
});
