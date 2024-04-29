import { cacheMap } from "./core";
import { CacheTypeEnum } from "./enums";

// export const HttpCodeError: Record<number, string> = {
//   [400]: "Bad Request",
//   [401]: "Unauthorized Access",
//   [403]: "Access Forbidden",
//   [404]: "Resource Not Found",
//   [500]: "Server Busy, Please Try Again Later",
//   [502]: "Server Busy, Please Try Again Later",
//   [503]: "Server Busy, Please Try Again Later",
//   [504]: "Request Timeout, Please Try Again Later",
// };

export const BEFORE_PATH_REGX = /^\//;
export const AFTER_PATH_REGX = /\/$/;

export const GET_REGX = /GET/i;
export const COMMON_REQUEST_METHODS = /(POST|PUT|PATCH|DELATE)/i;

export const TIMEOUT = 1000 * 30;

export const DEFAULT_MAX_RETRIES = 0;

export const DEFAULT_CACHE_STORE = cacheMap[CacheTypeEnum.MEMORY];

export const DEFAULT_CACHE_CONFIG = {
  enable: false,
  type: CacheTypeEnum.MEMORY as const,
};

export const DEFAULT_IDEMPOTENCE = false;
export const DEFAULT_IDEMPOTENCE_TIMEOUT = 5 * 60 * 1000;
