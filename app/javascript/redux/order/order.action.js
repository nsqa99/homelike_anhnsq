import types from "./order.type";

export const getAllOrder = (username, options = {}) => ({
  type: types.GET_ALL_ORDER,
  payload: { username, options },
});

export const getAllOrderMerchant = (username, options = {}) => ({
  type: types.GET_ALL_ORDER_MERCHANT,
  payload: { username, options },
});

export const createOrder = (username, data) => ({
  type: types.CREATE_ORDER,
  payload: { username, data },
});

export const getOneOrder = (username, orderId) => ({
  type: types.GET_ONE_ORDER,
  payload: { username, orderId },
});

export const confirmPayment = (username, orderId) => ({
  type: types.CONFIRM_PAYMENT,
  payload: { username, orderId },
});

export const getOneOrderByItem = (username, itemId) => ({
  type: types.GET_ONE_BY_ITEM_ORDER,
  payload: { username, itemId },
});

export const destroyOrder = (username, orderId) => ({
  type: types.DESTROY_ORDER,
  payload: { username, orderId },
});

export const makePayout = (username, orderId) => ({
  type: types.MAKE_PAYOUT,
  payload: { username, orderId },
});

export const getAllOrderResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess ? types.GET_ALL_ORDER_SUCCESS : types.GET_ALL_ORDER_FAILED,
    payload,
  };
};

export const getAllOrderMerchantResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess ? types.GET_ALL_ORDER_MERCHANT_SUCCESS : types.GET_ALL_ORDER_MERCHANT_FAILED,
    payload,
  };
};

export const getOneOrderResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess ? types.GET_ONE_ORDER_SUCCESS : types.GET_ONE_ORDER_FAILED,
    payload,
  };
};

export const confirmPaymentResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess ? types.CONFIRM_PAYMENT_SUCCESS : types.CONFIRM_PAYMENT_FAILED,
    payload,
  };
};

export const makePayoutResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess ? types.MAKE_PAYOUT_SUCCESS : types.MAKE_PAYOUT_FAILED,
    payload,
  };
};

export const getOneOrderByItemResult = (payload, isSuccess = true) => {
  return {
    type: isSuccess
      ? types.GET_ONE_BY_ITEM_ORDER_SUCCESS
      : types.GET_ONE_BY_ITEM_ORDER_FAILED,
    payload,
  };
};

export const createOrderResult = (payload) => ({
  type: types.CREATE_ORDER_SUCCESS,
  payload,
});

export const destroyOrderResult = (payload) => ({
  type: types.DESTROY_ORDER_SUCCESS,
  payload,
});
