import axios, { AxiosInstance } from "axios";
import https from "https";
import { jwtDecode } from "jwt-decode";
import http from "./http";
import { Cookies } from "next-client-cookies";

const instanceAxios = axios.create({
  baseURL: process.env.DB_URL,

  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
let tokenN = "";
class HttpToken {
  axiosJWTs(token: string, refreshToken: string, cookies: Cookies) {
    let i = 0;
    let tokenNc = token;

    instanceAxios.interceptors.request.use(
      async (config) => {
        return await new Promise(async (resolve, reject) => {
          try {
            const date = new Date();
            if (!tokenN) tokenN = tokenNc;
            if (tokenNc === tokenN) {
              config.headers.Authorization = "Bearer " + tokenNc;
              const decodeToken: any = await jwtDecode(tokenNc);
              // if (refreshTokenT.exp < date.getTime() / 1000 + 5) {
              // } else
              if (decodeToken.exp < date.getTime() / 1000 + 5) {
                // faster 50 second
                const res = await http.post("User/RefreshToken", {
                  accessToken: tokenNc,
                  refreshToken,
                });
                tokenN = res.data.accessToken;
                cookies.set("token", res.data.accessToken, {
                  path: "/",
                  secure: false,
                  sameSite: "strict",
                });
                cookies.set("refreshToken", res.data.refreshToken, {
                  path: "/",
                  secure: false,
                  sameSite: "strict",
                });
                config.headers.Authorization = "Bearer " + res.data.accessToken;
              }
            }
            resolve(config);
          } catch (error) {
            reject(error);
          }
        });
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    return instanceAxios;
  }
}
export default new HttpToken().axiosJWTs;
