import axios from "axios";
import _ from "lodash";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const POST_ENDPOINT = `${API_BASE_URL}/posts`;

export const getAllCommentApi = async (payload) => {
  const {data, options} = payload;
  if (!_.isEqual(options, {})) {
    return await AuthorizedAxios.get(`${POST_ENDPOINT}/${data}/comments`, {params: options});
  }
  return await AuthorizedAxios.get(`${POST_ENDPOINT}/${data}/comments`);
};

export const createCommentApi = async (data) => {
  return await AuthorizedAxios.post(
    `${POST_ENDPOINT}/${data.postId}/comments`,
    data
  );
};

export const destroyCommentApi = async (data) => {
  return await AuthorizedAxios.delete(
    `${POST_ENDPOINT}/${data.postId}/comments/${data.commentId}`,
    data
  );
};
