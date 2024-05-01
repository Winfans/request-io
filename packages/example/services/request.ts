import { Service } from '@request-io/core';
import { AxiosRequest } from '@request-io/request';

const BASE_URL = 'https://api.ai.xg.wffanshao.top';

const http = new AxiosRequest();
// const http = new FetchRequest<IBaseError>();

const apiService = new Service({
  baseUrl: BASE_URL,
  http: http,
});

export default apiService;
