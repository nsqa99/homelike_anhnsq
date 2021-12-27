import axios from "axios";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const ITEM_ENDPOINT = `${API_BASE_URL}/items`;

const MERCHANT_ITEM_ENDPOINT = `${API_BASE_URL}/merchants`;

export const getAllItemsApi = async () => {
  return await axios.get(`${ITEM_ENDPOINT}/search`);
};

export const searchItemsApi = async (params, options) => {
  return await axios.get(`${ITEM_ENDPOINT}/search`, {
    params: { ...params, ...options },
  });
};

export const getOneItemsApi = async (itemId) => {
  return await axios.get(`${ITEM_ENDPOINT}/${itemId}`);
};

export const createItemApi = async (username, data, config) => {
  return await AuthorizedAxios.post(
    `${MERCHANT_ITEM_ENDPOINT}/${username}/items`,
    data,
    config
  );
};

export const getAllItemsByUsernameApi = async (username, options) => {
  return await AuthorizedAxios.get(`${MERCHANT_ITEM_ENDPOINT}/${username}/items`, {
    params: options,
  });
};

// export const createItemReviewApi = async (data) => {
//   return await AuthorizedAxios.post(
//     `${ITEM_ENDPOINT}/${data.itemId}/reviews`,
//     data
//   );
// };

// export const destroyItemReviewApi = async (data) => {
//   return await AuthorizedAxios.delete(
//     `${ITEM_ENDPOINT}/${data.itemId}/reviews/${data.reviewId}`,
//     data
//   );
// };
