import Axios from "axios";

const ITEM_ENDPOINT = "api/v1/items";

export const getAllItemsApi = async () => {
  return await Axios.get(`${ITEM_ENDPOINT}/search`);
};
