import { Service } from "../core";
import { AxiosRequest, FetchRequest } from "../request";

interface IBaseError {
  code: number;
  error_msg: string;
}

const BASE_URL = "https://api.ai.xg.wffanshao.top";

const http = new AxiosRequest<IBaseError>();
// const http = new FetchRequest<IBaseError>();

const apiService = new Service({
  baseUrl: BASE_URL,
  http: http,
});

export default apiService;
