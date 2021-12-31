// import { CreateAccount } from "./email.api";
import types from "./user.type";

export const getOneUser = (data, isAuth = false) => ({
  type: isAuth ? types.GET_ONE_USER_AUTH : types.GET_ONE_USER,
  payload: { data }
});

export const getOneUserResult = (payload, isAuth = false, isSuccess = true) => ({
  type: isSuccess
    ? isAuth ? types.GET_ONE_USER_AUTH_SUCCESS : types.GET_ONE_USER_SUCCESS
    : isAuth ? types.GET_ONE_USER_AUTH_FAILED : types.GET_ONE_USER_FAILED,
  payload,
});

export const followUser = (follower, followed) => ({
  type: types.FOLLOW_USER,
  payload: { follower, followed }
});

export const followUserResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.FOLLOW_USER_SUCCESS
    : types.FOLLOW_USER_FAILED,
  payload,
});

export const unfollowUser = (unfollower, unfollowed) => ({
  type: types.UNFOLLOW_USER,
  payload: { unfollower, unfollowed }
});

export const unfollowUserResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.UNFOLLOW_USER_SUCCESS
    : types.UNFOLLOW_USER_FAILED,
  payload,
});
