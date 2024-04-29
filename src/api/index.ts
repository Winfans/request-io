import apiService from "./request";

interface IBaseResult<T> {
  code: number;
  success: boolean;
  data: T;
}
export const testGet = (params: { content: string }) => {
  return apiService.call<
    IBaseResult<{
      content: string;
    }>
  >({
    apiName: "/test",
    params,
    options: {
      method: "GET",
    },
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
    options: {
      method: "POST",
    },
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
    options: {
      method: "GET",
    },
  });
};
