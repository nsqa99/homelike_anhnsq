import axios from "axios";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const POST_ENDPOINT = `${API_BASE_URL}/posts`;

const USER_POST_ENDPOINT = `${API_BASE_URL}/users`;

export const getAllPostApi = async () => {
  return await axios.get(POST_ENDPOINT);
};

export const searchPostApi = async (params, options) => {
  return await axios.get(`${POST_ENDPOINT}/search`, {
    params: { ...params, ...options },
  });
};

export const getOnePostApi = async (postId) => {
  return await axios.get(`${POST_ENDPOINT}/${postId}`);
};

export const createPostApi = async (username, data, config) => {
  return await AuthorizedAxios.post(
    `${USER_POST_ENDPOINT}/${username}/posts`,
    data,
    config
  );
};

export const likePostApi = async (username, postId) => {
  return await AuthorizedAxios.post(
    `${USER_POST_ENDPOINT}/${username}/posts/${postId}/like`
  );
};

export const unlikePostApi = async (username, postId) => {
  return await AuthorizedAxios.post(
    `${USER_POST_ENDPOINT}/${username}/posts/${postId}/unlike`
  );
};

export const getAllPostByUsernameApi = async (username, options) => {
  return await AuthorizedAxios.get(`${USER_POST_ENDPOINT}/${username}/posts`, {
    params: options,
  });
};

export const destroyPostApi = async (username, postId) => {
  return await AuthorizedAxios.delete(
    `${USER_POST_ENDPOINT}/${username}/posts/${postId}`
  );
};

export const updatePostApi = async (username, postId, data, config) => {
  return await AuthorizedAxios.put(
    `${USER_POST_ENDPOINT}/${username}/posts/${postId}`,
    data,
    config
  );
};
