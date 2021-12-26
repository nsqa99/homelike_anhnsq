// import { CreateAccount } from "./email.api";
import types from "./item.type";

export const getAllItems = () => ({
  type: types.GET_ALL_ITEM,
});

export const getOneItem = (data) => ({
  type: types.GET_ONE_ITEM,
  payload: { data }
});

export const getAllItemsResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.GET_ALL_ITEM_SUCCESS
    : types.GET_ALL_ITEM_FAILED,
  payload,
});

export const getOneItemResult = (payload, isSuccess = true) => ({
  type: isSuccess
    ? types.GET_ONE_ITEM_SUCCESS
    : types.GET_ONE_ITEM_FAILED,
  payload,
});
