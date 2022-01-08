import { API_BASE_URL } from "../../common/constant";
import axios from 'axios';

const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

export const loginApi = async (data) => {
  return await axios.post(AUTH_ENDPOINT, data);
};

export const registerApi = async (data) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  return await axios.post(`${AUTH_ENDPOINT}/signup`, data, config);
};
