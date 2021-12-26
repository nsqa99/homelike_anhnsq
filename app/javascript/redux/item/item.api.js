import Axios from "axios";
import { API_BASE_URL } from "../../common/constant";

const ITEM_ENDPOINT = `${API_BASE_URL}/items`;

export const getAllItemsApi = async () => {
  return await Axios.get(`${ITEM_ENDPOINT}/search`);
};

export const getOneItemsApi = async (itemId) => {
  return await Axios.get(`${ITEM_ENDPOINT}/${itemId}`);
};
