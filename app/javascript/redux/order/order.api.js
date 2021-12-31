import axios from "axios";
import _ from "lodash";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const CUSTOMER_ENDPOINT = `${API_BASE_URL}/customers`;

export const getAllOrderApi = async (username, options) => {
  return await AuthorizedAxios.get(`${CUSTOMER_ENDPOINT}/${username}/orders`, {
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
