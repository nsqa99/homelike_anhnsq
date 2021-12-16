// import { CreateAccount } from "./email.api";
import types from "./item.type";

export const getAllItems = () => ({
  type: types.GET_ALL_ITEM,
});

export const getAllItemsResult = (result, isSuccess = true) => ({
  type: isSuccess
    ? types.GET_ALL_ITEM_SUCCESS
    : types.GET_ALL_ITEM_FAILED,
  result: result,
});
