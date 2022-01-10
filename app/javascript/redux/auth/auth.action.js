// import { CreateAccount } from "./email.api";
import types from "./auth.type";
import storage from "redux-persist/lib/storage";

export const login = (data) => ({
  type: types.LOGIN,
  payload: { data },
});

export const register = (data, image) => ({
  type: types.REGISTER,
  payload: { data, image },
});

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  storage.removeItem("persist:root");

  return {
    type: types.LOGOUT,
  };
};

export const loginResult = (isSuccess, isAdmin = false) => ({
  type: isSuccess ? types.LOGIN_SUCCESS : types.LOGIN_FAILED,
  result: { isAuthenticated: isSuccess, isAdmin },
});

export const registerResult = (isSuccess) => ({
  type: isSuccess ? types.REGISTER_SUCCESS : types.REGISTER_FAILED,
});

export const resetRegisterRedirect = () => ({
  type: types.RESET_REGISTER_REDIRECT,
});

export const setCurrentUser = (username) => {
  return {
    type: types.SET_CURRENT_USER,
    result: username,
  };
};
export const setCurrentAdmin = (username) => {
  return {
    type: types.SET_CURRENT_ADMIN,
    result: username,
  };
};
