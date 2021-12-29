import types from "./comment.type";

export const getAllComment = (data, options = {}) => ({
  type: types.GET_ALL_COMMENT,
  payload: { data, options },
});

export const createComment = (data) => ({
  type: types.CREATE_COMMENT,
  payload: data,
});

export const destroyComment = (data) => ({
  type: types.DESTROY_COMMENT,
  payload: data,
});

export const getAllCommentResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess
      ? types.GET_ALL_COMMENT_SUCCESS
      : types.GET_ALL_COMMENT_FAILED,
    payload,
  };
};

export const createCommentResult = (payload) => ({
  type: types.CREATE_COMMENT_SUCCESS,
  payload,
});

export const destroyCommentResult = (payload) => ({
  type: types.DESTROY_COMMENT_SUCCESS,
  payload,
});
