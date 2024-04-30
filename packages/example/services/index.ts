import apiService from "./request";

interface IBaseResult<T> {
  code: number;
  success: boolean;
  data: T;
  msg?: string;
}

export const testGet = (params: { content: string }) => {
  return apiService.get<
    IBaseResult<{
      content: string;
    }>
  >({
    apiName: "/test",
    params,
  });
};

export const testPost = (params: { content: string }) => {
  return apiService.call<
    IBaseResult<{
      content: string;
    }>
  >({
    apiName: "/test",
    params,
    method: "POST",
  });
};

export const testError = (params: { content: string }) => {
  return apiService.call<
    IBaseResult<{
      content: string;
    }>
  >({
    apiName: "/test/error",
    params,
    maxRetries: 5,
    method: "GET",
  });
};
