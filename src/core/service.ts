import {
  AFTER_PATH_REGX,
  BEFORE_PATH_REGX,
  COMMON_REQUEST_METHODS,
  DEFAULT_CACHE_CONFIG,
  DEFAULT_MAX_RETRIES,
  GET_REGX,
} from "../constants";
import { CacheTypeEnum } from "../enums";
import { IBaseCache, ServiceCallOptions, ServiceOptions } from "../types";
import { getCacheKey } from "../utils";
import { cacheMap } from "./cache";

class Service {
  options: ServiceOptions;
  cacheAdaptor: IBaseCache = cacheMap[CacheTypeEnum.MEMORY];
  constructor(options: ServiceOptions) {
    this.options = options;
    if (options.cache?.type) {
      this.cacheAdaptor = cacheMap[options.cache.type];
    }
  }

  async call<T>({
    apiName,
    params,
    maxRetries = this.options.maxRetries || DEFAULT_MAX_RETRIES,
    cache = this.options.cache || DEFAULT_CACHE_CONFIG,
    options = {},
  }: ServiceCallOptions) {
    // 接口缓存 - 获取缓存
    if (cache.enable) {
      if (cache.type) {
        this.cacheAdaptor = cacheMap[cache.type];
      }

      const cacheKey = getCacheKey(apiName, options.method, params);
      if (this.cacheAdaptor.has(cacheKey)) {
        return this.cacheAdaptor.get(cacheKey);
      }
    }

    const { baseUrl, http } = this.options;
    const beforePath = BEFORE_PATH_REGX.test(apiName) ? "" : "/";
    const requestUrl = `${baseUrl.replace(
      AFTER_PATH_REGX,
      ""
    )}${beforePath}${apiName}`;
    const { method = "POST" } = options;
    const requestOptions = {
      method,
      url: requestUrl,
      ...options,
    };

    if (GET_REGX.test(method)) {
      Object.assign(requestOptions, {
        params,
      });
    } else if (COMMON_REQUEST_METHODS.test(method)) {
      Object.assign(requestOptions, {
        data: params,
      });
    }
    try {
      const res = await http.request<T>(requestOptions);

      // 接口缓存 - 设置缓存
      if (cache.enable) {
        const cacheKey = getCacheKey(apiName, options.method, params);
        this.cacheAdaptor.set(cacheKey, res);
      }

      return res;
    } catch (e) {
      // 接口重试
      if (maxRetries > 0) {
        return this.call<T>({
          apiName,
          params,
          maxRetries: maxRetries - 1,
          options,
        });
      } else {
        throw e;
      }
    }
  }

  // handleError(err: E) {
  //   const { code, msg } = err;
  //   const errorText = `${HttpCodeError[code] || msg}`;
  //   return {
  //     code: code,
  //     msg: errorText,
  //   };
  // }
}

export { Service };
