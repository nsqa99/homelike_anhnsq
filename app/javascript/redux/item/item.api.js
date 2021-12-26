import axios from "axios";
import { API_BASE_URL } from "../../common/constant";

const ITEM_ENDPOINT = `${API_BASE_URL}/items`;

export const getAllItemsApi = async () => {
  return await axios.get(`${ITEM_ENDPOINT}/search`);
};

export const searchItemsApi = async (params) => {
  return await axios.get(`${ITEM_ENDPOINT}/search`, {
    params: { ...params },
  });
};

export const getOneItemsApi = async (itemId) => {
  return await axios.get(`${ITEM_ENDPOINT}/${itemId}`);
};
