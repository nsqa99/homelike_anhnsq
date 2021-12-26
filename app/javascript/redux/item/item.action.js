// import { CreateAccount } from "./email.api";
import types from "./item.type";

export const getAllItems = () => ({
  type: types.GET_ALL_ITEM,
});

export const getOneItem = (data) => ({
  type: types.GET_ONE_ITEM,
  payload: { data },
});

export const searchItem = (params) => ({
  type: types.SEARCH_ITEM,
  payload: params,
});

// export const createReview = (data) => ({
//   type: types.CREATE_REVIEW,
//   payload: data,
// });

// export const destroyReview = (data) => ({
//   type: types.DESTROY_REVIEW,
//   payload: data,
// });

export const getAllItemsResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.GET_ALL_ITEM_SUCCESS : types.GET_ALL_ITEM_FAILED,
  payload,
});

export const getOneItemResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.GET_ONE_ITEM_SUCCESS : types.GET_ONE_ITEM_FAILED,
  payload,
});

export const searchItemResult = (payload) => {
  return {
    type: types.SEARCH_ITEM_SUCCESS,
    payload,
  };
};

// export const createReviewResult = (payload) => ({
//   type: types.CREATE_REVIEW_SUCCESS,
//   payload,
// });

// export const destroyReviewResult = (payload) => ({
//   type: types.DESTROY_REVIEW_SUCCESS,
//   payload,
// });
