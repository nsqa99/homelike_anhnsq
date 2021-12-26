import Axios from "axios";

const USER_ENPOINT = "api/v1/users";

export const getOneUserApi = async (username) => {
  return await Axios.get(`${USER_ENPOINT}/${username}`);
};
