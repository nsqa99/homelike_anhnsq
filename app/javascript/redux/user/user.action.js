// import { CreateAccount } from "./email.api";
import types from "./user.type";

export const getOneUser = (data, isAuth = false) => ({
  type: isAuth ? types.GET_ONE_USER_AUTH : types.GET_ONE_USER,
  payload: { data },
});
export const searchUser = (data, options) => ({
  type: types.SEARCH_USER,
  payload: { data, options },
});
export const deleteUser = (data) => ({
  type: types.DESTROY_USER,
  payload: { data },
});

export const deleteUserResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.DESTROY_USER_SUCCESS : types.DESTROY_USER_FAILED,
  payload,
});

export const getOneUserResult = (
  payload,
  isAuth = false,
  isSuccess = true
) => ({
  type: isSuccess
    ? isAuth
      ? types.GET_ONE_USER_AUTH_SUCCESS
      : types.GET_ONE_USER_SUCCESS
    : isAuth
    ? types.GET_ONE_USER_AUTH_FAILED
    : types.GET_ONE_USER_FAILED,
  payload,
});

export const searchUserResult = (payload, isSuccess = true) => ({
  type: isSuccess ? types.SEARCH_USER_SUCCESS : types.SEARCH_USER_FAILED,
  payload,
});

export const followUser = (follower, followed, onSearch) => ({
  type: types.FOLLOW_USER,
  payload: { follower, followed, onSearch },
});

export const followUserResult = (payload, isSuccess = true, onSearch) => {
  if (onSearch) {
    return {
      type: isSuccess ? types.FOLLOW_USER_ON_SEARCH_SUCCESS : types.FOLLOW_USER_FAILED,
      payload,
    }
  } else {
    return {
      type: isSuccess ? types.FOLLOW_USER_SUCCESS : types.FOLLOW_USER_FAILED,
      payload,
    }
  }
};

export const unfollowUser = (unfollower, unfollowed, onSearch) => ({
  type: types.UNFOLLOW_USER,
  payload: { unfollower, unfollowed, onSearch },
});

export const unfollowUserResult = (payload, isSuccess = true, onSearch) => {
  if (onSearch) {
    return {
      type: isSuccess ? types.UNFOLLOW_USER_ON_SEARCH_SUCCESS : types.UNFOLLOW_USER_FAILED,
      payload,
    }
  } else {
    return {
      type: isSuccess ? types.UNFOLLOW_USER_SUCCESS : types.UNFOLLOW_USER_FAILED,
      payload,
    }
  }
};
