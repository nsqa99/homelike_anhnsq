import types from "./tag.type";

export const getAllTag = (data, options = {}) => ({
  type: types.GET_ALL_TAG,
  payload: { data, options },
});

export const getAllTagResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess
      ? types.GET_ALL_TAG_SUCCESS
      : types.GET_ALL_TAG_FAILED,
    payload,
  };
};
