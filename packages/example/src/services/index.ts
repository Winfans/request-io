import { apiService } from './request';

export interface IBaseResult<T> {
  code: number;
  success: boolean;
  data: T;
  msg?: string;
}

export const testGet = (params: { content: string }) => {
  return apiService.get<
    IBaseResult<{
      message: string;
    }>
  >({
    apiName: '/test',
    params,
    // maxRetries: 5,
    // cache: {
    //   enable: true,
    // },
    // abort: true,
    // idempotence: true,
  });
};

export const testGetWithMemory = (params: { content: string; type: number }) => {
  return apiService.get<
    IBaseResult<{
      message: string;
    }>
  >({
    apiName: '/test',
    params,
    cache: {
      enable: true,
      type: 'memory',
    },
  });
};

export const testPost = (params: { content: string }) => {
  return apiService.call<
    IBaseResult<{
      content: string;
    }>
  >({
    apiName: '/test',
    params,
    method: 'POST',
  });
};

export const testError = (params: { content: string }) => {
  return apiService.call<
    IBaseResult<{
      content: string;
    }>
  >({
    apiName: '/test/error',
    params,
    maxRetries: 5,
    method: 'GET',
  });
};

export * from './request';
