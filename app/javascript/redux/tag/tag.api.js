import axios from "axios";
import _ from "lodash";
import { API_BASE_URL } from "../../common/constant";
import { AuthorizedAxios } from "../../utils/axios";

const TAG_ENDPOINT = `${API_BASE_URL}/tags`;

export const getAllTagApi = async () => {
  return await AuthorizedAxios.get(TAG_ENDPOINT);
};
