// import { CreateAccount } from "./email.api";
import types from "./user.type";

export const getOneUser = (data) => ({
  type: types.GET_ONE_USER,
  payload: { data }
});

export const getOneUserResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.GET_ONE_USER_SUCCESS
    : types.GET_ONE_USER_FAILED,
  payload,
});
