import axios from "axios";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const ITEM_ENDPOINT = `${API_BASE_URL}/items`;

export const createReviewApi = async (data) => {
  return await AuthorizedAxios.post(
    `${ITEM_ENDPOINT}/${data.itemId}/reviews`,
    data
  );
};

export const destroyReviewApi = async (data) => {
  return await AuthorizedAxios.delete(
    `${ITEM_ENDPOINT}/${data.itemId}/reviews/${data.reviewId}`,
    data
  );
};
