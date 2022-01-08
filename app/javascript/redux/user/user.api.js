import Axios from "axios";
import { AuthorizedAxios } from "../../utils/axios";
import { API_BASE_URL } from "../../common/constant";

const USER_ENPOINT = `${API_BASE_URL}/users`;

export const getOneUserApi = async (username) => {
  return await Axios.get(`${USER_ENPOINT}/${username}`);
};
export const searchUserApi = async (params) => {
  return await Axios.get(`${USER_ENPOINT}/search`, { params });
};

export const followUserApi = async (follower, followed) => {
  return await AuthorizedAxios.post(
    `${USER_ENPOINT}/${follower}/follow/${followed}`
  );
};

export const unfollowUserApi = async (unfollower, unfollowed) => {
  return await AuthorizedAxios.post(
    `${USER_ENPOINT}/${unfollower}/unfollow/${unfollowed}`
  );
};
