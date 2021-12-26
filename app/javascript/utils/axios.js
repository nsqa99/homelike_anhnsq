import axios from "axios";

export const AuthorizedAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

AuthorizedAxios.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) req.headers["Authorization"] = `Bearer: ${accessToken}`;

  return req;
});

AuthorizedAxios.interceptors.response.use(async (res) => {
  if (res.status === 400 && res.data.message === "TOKEN_EXPIRED") {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const response = await axios.post("api/v1/auth/refresh", {
        token: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(
          "access_token",
          response.data?.data.access_token
        );
        localStorage.setItem(
          "refresh_token",
          response.data?.data.refresh_token
        );
        const config = res.config;
        config.headers[
          "Authorization"
        ] = `Bearer: ${response.data?.data.access_token}`;

        return AuthorizedAxios(config);
      }
    }
  }

  return res;
});
