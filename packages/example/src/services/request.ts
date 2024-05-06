import { Service, getCacheKey } from '@request-client/core';
import { AxiosRequest } from '@request-client/request';

const BASE_URL = 'https://api.ai.xg.wffanshao.top';

const http = new AxiosRequest();
// const http = new FetchRequest<IBaseError>();

const apiService = new Service({
  baseUrl: BASE_URL,
  http: http,
});

export { apiService, http, getCacheKey };
