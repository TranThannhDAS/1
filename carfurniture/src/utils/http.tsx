import axios, { AxiosInstance } from "axios";
import https from "https";
import { jwtDecode } from "jwt-decode";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.DB_URL,

      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }
  private isInterceptorAttached: boolean = false;
}
export default new Http().instance;
