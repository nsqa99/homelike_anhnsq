import axios from "axios";
import _ from "lodash";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const ITEM_ENDPOINT = `${API_BASE_URL}/items`;

export const getAllReviewApi = async (payload) => {
  const {data, options} = payload;
  if (!_.isEqual(options, {})) {
    return await AuthorizedAxios.get(`${ITEM_ENDPOINT}/${data}/reviews`, {params: options});
  }
  return await AuthorizedAxios.get(`${ITEM_ENDPOINT}/${data}/reviews`);
};

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
