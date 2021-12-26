import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

export const loginApi = async (data) => {
  return await AuthorizedAxios.post(AUTH_ENDPOINT, data);
};
