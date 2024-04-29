import { MD5 } from "crypto-js";

export const getCacheKey = (
  apiName: string,
  method = "",
  params: Record<string, unknown> = {}
) => {
  return `cache:${apiName}:${method}:${JSON.stringify(params)}`;
};

export const getMd5Key = (
  apiName: string,
  method = "",
  params: Record<string, unknown> = {}
) => {
  return MD5(
    JSON.stringify({
      apiName,
      method,
      params,
    })
  );
};
