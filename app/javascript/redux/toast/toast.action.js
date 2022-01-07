import types from "./toast.type";

export const createSuccess = (data) => ({
  type: types.CREATE_SUCCESS,
  payload: { data }
});

export const createSuccessResult = (payload) => ({
  type: types.CREATE_SUCCESS_SUCCESS,
  payload,
});
export const createFail = (data) => ({
  type: types.CREATE_FAIL,
  payload: { data }
});

export const createFailResult = (payload) => ({
  type: types.CREATE_FAIL_SUCCESS,
  payload,
});
export const createLoading = (data) => ({
  type: types.CREATE_LOADING,
  payload: { data }
});

export const createLoadingResult = (payload) => ({
  type: types.CREATE_LOADING_SUCCESS,
  payload,
});
export const resetToast = () => ({
  type: types.RESET_TOAST
});

export const resetToastResult = () => ({
  type: types.RESET_TOAST_SUCCESS
});

export const removeToast = () => ({
  type: types.REMOVE_TOAST
});

export const removeToastResult = () => ({
  type: types.REMOVE_TOAST_SUCCESS
});
