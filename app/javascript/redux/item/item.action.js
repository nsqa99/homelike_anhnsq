import types from "./item.type";

export const getAllItems = () => ({
  type: types.GET_ALL_ITEM,
});

export const getAllItemsResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.GET_ALL_ITEM_SUCCESS : types.GET_ALL_ITEM_FAILED,
  payload,
});

export const getOneItem = (data) => ({
  type: types.GET_ONE_ITEM,
  payload: { data },
});

export const getOneItemResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.GET_ONE_ITEM_SUCCESS : types.GET_ONE_ITEM_FAILED,
  payload,
});

export const searchItem = (params, options = {}) => ({
  type: types.SEARCH_ITEM,
  payload: { params, options },
});

export const searchItemResult = (payload) => {
  return {
    type: types.SEARCH_ITEM_SUCCESS,
    payload,
  };
};

export const resetItemState = () => ({
  type: types.RESET_ITEM_STATE,
});

export const resetItemStateResult = () => ({
  type: types.RESET_ITEM_STATE_SUCCESS,
});

export const createItem = (username, data, images) => ({
  type: types.CREATE_ITEM,
  payload: { username, data, images },
});

export const createItemResult = (payload) => ({
  type: types.CREATE_ITEM_SUCCESS,
  payload,
});

export const getAllItemsByUsername = (payload, options = {}) => ({
  type: types.GET_ALL_ITEM_BY_USERNAME,
  payload: { data: payload, options },
});

export const getAllItemsByUsernameResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.GET_ALL_ITEM_BY_USERNAME_SUCCESS
    : types.GET_ALL_ITEM_BY_USERNAME_FAILED,
  payload,
});

export const destroyItem = (username, itemId, isSearch) => ({
  type: types.DESTROY_ITEM,
  payload: { username, itemId, isSearch },
});

export const destroyItemResult = (payload, isSearch) => ({
  type: types.DESTROY_ITEM_SUCCESS,
  payload: { data: payload, isSearch },
});
