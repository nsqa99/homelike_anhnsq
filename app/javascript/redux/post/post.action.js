import types from "./post.type";

export const getAllPost = () => ({
  type: types.GET_ALL_POST,
});

export const getAllPostResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.GET_ALL_POST_SUCCESS : types.GET_ALL_POST_FAILED,
  payload,
});

export const getOnePost = (data) => ({
  type: types.GET_ONE_POST,
  payload: { data },
});

export const getOnePostResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.GET_ONE_POST_SUCCESS : types.GET_ONE_POST_FAILED,
  payload,
});

export const searchPost = (params, options = {}) => ({
  type: types.SEARCH_POST,
  payload: { params, options },
});

export const searchPostResult = (payload) => {
  return {
    type: types.SEARCH_POST_SUCCESS,
    payload,
  };
};

export const resetPostState = () => ({
  type: types.RESET_POST_STATE,
});

export const resetPostStateResult = () => ({
  type: types.RESET_POST_STATE_SUCCESS,
});

export const createPost = (username, data, images) => ({
  type: types.CREATE_POST,
  payload: { username, data, images },
});

export const createPostResult = (payload) => ({
  type: types.CREATE_POST_SUCCESS,
  payload,
});

export const sharePost = (username, data) => ({
  type: types.SHARE_POST,
  payload: { username, data },
});

export const sharePostResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.SHARE_POST_SUCCESS : types.SHARE_POST_FAILED,
  payload,
});

export const resetShareState = () => ({
  type: types.RESET_SHARE_STATE,
});

export const resetShareStateResult = () => ({
  type: types.RESET_SHARE_STATE_SUCCESS,
});

export const likePost = (username, postId) => ({
  type: types.LIKE_POST,
  payload: { username, postId },
});

export const likePostResult = (payload) => ({
  type: types.LIKE_POST_SUCCESS,
  payload,
});

export const unlikePost = (username, postId) => ({
  type: types.UNLIKE_POST,
  payload: { username, postId },
});

export const unlikePostResult = (payload) => ({
  type: types.UNLIKE_POST_SUCCESS,
  payload,
});

export const getAllPostByUsername = (payload, options = {}) => ({
  type: types.GET_ALL_POST_BY_USERNAME,
  payload: { data: payload, options },
});

export const getAllPostByUsernameResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.GET_ALL_POST_BY_USERNAME_SUCCESS
    : types.GET_ALL_POST_BY_USERNAME_FAILED,
  payload,
});

export const destroyPost = (username, itemId, isSearch) => ({
  type: types.DESTROY_POST,
  payload: { username, itemId, isSearch },
});

export const destroyPostResult = (payload, isSearch) => ({
  type: types.DESTROY_POST_SUCCESS,
  payload: { data: payload, isSearch },
});

export const updatePost = (username, itemId, data, images, isSearch) => ({
  type: types.UPDATE_POST,
  payload: { username, itemId, data, images, isSearch },
});

export const updatePostResult = (payload, isSearch) => ({
  type: types.UPDATE_POST_SUCCESS,
  payload: { data: payload, isSearch },
});
