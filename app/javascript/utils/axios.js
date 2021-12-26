import axios from "axios";

export const Axios = async (method, url, data, ...props) => {
  const axiosInstance = axios.create({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    ...props,
  });

  axiosInstance.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) req.headers.Authorization = `Bearer: ${accessToken}`;
    
    return req;
  });

  axiosInstance.interceptors.response.use(async (res) => {
    if (res.status === 400 && res.data.message === 'TOKEN_EXPIRED') {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const response = await axios.post('api/v1/auth/refresh', {token: refreshToken})
        if (response.status === 200) {
          localStorage.setItem("access_token", response.data?.data.access_token);
          localStorage.setItem("refresh_token", response.data?.data.refresh_token);

          const wantedResponse = await axios({
            method,
            url,
            data,
            ...props,
          });
          
          if (wantedResponse.status === 200) return wantedResponse;
        }
      }
    }
    return res;
  });
};

export const AxiosMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
