import axios from "axios";
import _ from "lodash";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const CUSTOMER_ENDPOINT = `${API_BASE_URL}/customers`;
const MERCHANT_ENDPOINT = `${API_BASE_URL}/merchants`;

export const getAllOrderApi = async (username, options) => {
  return await AuthorizedAxios.get(`${CUSTOMER_ENDPOINT}/${username}/orders`, {
    params: options,
  });
};

export const getAllOrderMerchantApi = async (username, options) => {
  return await AuthorizedAxios.get(`${MERCHANT_ENDPOINT}/${username}/orders`, {
    params: options,
  });
};

export const getOneOrderApi = async (username, orderId) => {
  return await AuthorizedAxios.get(
    `${CUSTOMER_ENDPOINT}/${username}/orders/${orderId}`
  );
};

export const getOneOrderByItemApi = async (username, itemId) => {
  return await AuthorizedAxios.get(
    `${CUSTOMER_ENDPOINT}/${username}/orders/get_one/by_item`,
    { params: { item_id: itemId } }
  );
};

export const createOrderApi = async (username, data) => {
  return await AuthorizedAxios.post(
    `${CUSTOMER_ENDPOINT}/${username}/orders`,
    data
  );
};
export const updateOrderApi = async (username, orderId, data) => {
  return await AuthorizedAxios.put(
    `${CUSTOMER_ENDPOINT}/${username}/orders/${orderId}`,
    data
  );
};

export const checkoutApi = async (username, orderId) => {
  return await AuthorizedAxios.post(
    `${CUSTOMER_ENDPOINT}/${username}/orders/${orderId}/payments`
  );
};

export const confirmPaymentApi = async (username, orderId) => {
  return await AuthorizedAxios.post(
    `${CUSTOMER_ENDPOINT}/${username}/orders/${orderId}/payments/complete`
  );
};

export const destroyOrderApi = async (username, orderId) => {
  return await AuthorizedAxios.delete(
    `${CUSTOMER_ENDPOINT}/${username}/orders/${orderId}`
  );
};

export const makePayoutApi = async (username, orderId) => {
  return await AuthorizedAxios.post(
    `${MERCHANT_ENDPOINT}/${username}/orders/${orderId}/payout`
  );
};
