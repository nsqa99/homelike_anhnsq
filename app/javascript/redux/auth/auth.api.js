import { API_BASE_URL } from "../../common/constant";
import { Axios, AxiosMethod } from "../../utils/axios";

const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

export const loginApi = async (data) => {
  return await Axios(AxiosMethod.POST, AUTH_ENDPOINT, data);
};
