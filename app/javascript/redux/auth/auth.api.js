import { Axios, AxiosMethod } from "../../utils/axios";

const AUTH_ENDPOINT = "api/v1/auth";

export const loginApi = async (data) => {
  return await Axios(AxiosMethod.POST, AUTH_ENDPOINT, data);
};
