import Axios from "axios";
import { API_BASE_URL } from "../../common/constant";

const USER_ENPOINT = `${API_BASE_URL}/users`;

export const getOneUserApi = async (username) => {
  return await Axios.get(`${USER_ENPOINT}/${username}`);
};
