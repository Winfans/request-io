import {
  AFTER_PATH_REGX,
  BEFORE_PATH_REGX,
  COMMON_REQUEST_METHODS,
  DEFAULT_ABORT,
  DEFAULT_CACHE_CONFIG,
  DEFAULT_IDEMPOTENCE,
  DEFAULT_IDEMPOTENCE_TIMEOUT,
  DEFAULT_MAX_RETRIES,
  GET_REGX,
} from './constants';
import { CacheTypeEnum } from './enums';
import { IBaseCache, ServiceCallOptions, ServiceOptions } from './types';
import { getCacheKey, getMd5Key } from './utils';
import { cacheMap } from './cache';

class Service {
  options: ServiceOptions;
  cacheStore: IBaseCache = cacheMap[CacheTypeEnum.MEMORY];
  constructor(options: ServiceOptions) {
    this.options = options;
    if (options.cache?.enable && options.cache?.type) {
      this.cacheStore = cacheMap[options.cache.type];
    }
  }

  async call<T>({
    apiName,
    params,
    method = 'POST',
    maxRetries = this.options.maxRetries || DEFAULT_MAX_RETRIES,
    cache = this.options.cache || DEFAULT_CACHE_CONFIG,
    idempotence = this.options.idempotence || DEFAULT_IDEMPOTENCE,
    abort = this.options.abort || DEFAULT_ABORT,
    options = {},
  }: ServiceCallOptions): Promise<T> {
    let cacheStore = this.cacheStore;

    // 接口缓存 - 获取缓存
    if (cache.enable) {
      if (cache.type) {
        cacheStore = cacheMap[cache.type];
      }

      const cacheKey = getCacheKey(apiName, method, params);
      if (cacheStore.has(cacheKey)) {
        return cacheStore.get(cacheKey) as T;
      }
    }

    // 接口幂等性
    if (idempotence) {
      const cacheStore = cacheMap[CacheTypeEnum.MEMORY];
      const md5 = getMd5Key(apiName, method, params);
      const cacheKey = md5.toString();
      if (cacheStore.has(cacheKey)) {
        return cacheStore.get(cacheKey) as T;
      }
    }

    const { baseUrl, http } = this.options;
    const beforePath = BEFORE_PATH_REGX.test(apiName) ? '' : '/';
    const requestUrl = `${baseUrl.replace(AFTER_PATH_REGX, '')}${beforePath}${apiName}`;
    const requestOptions = {
      method,
      url: requestUrl,
      abort,
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
        const cacheKey = getCacheKey(apiName, method, params);
        cacheStore.set(cacheKey, res);
      }

      // 接口幂等性 - 设置缓存
      if (idempotence) {
        const cacheStore = cacheMap[CacheTypeEnum.MEMORY];
        const md5 = getMd5Key(apiName, method, params);
        const cacheKey = md5.toString();
        cacheStore.set(cacheKey, res, DEFAULT_IDEMPOTENCE_TIMEOUT);
      }
      return res;
    } catch (e) {
      // 接口重试
      if (maxRetries > 0) {
        return this.call<T>({
          apiName,
          params,
          method,
          maxRetries: maxRetries - 1,
          options,
        });
      } else {
        throw e;
      }
    }
  }

  async get<T>(options: ServiceCallOptions): Promise<T> {
    return this.call({
      ...options,
      method: 'GET',
    });
  }
  async post<T>(options: ServiceCallOptions): Promise<T> {
    return this.call({
      ...options,
      method: 'POST',
    });
  }
  async delete<T>(options: ServiceCallOptions): Promise<T> {
    return this.call({
      ...options,
      method: 'DELETE',
    });
  }
  async put<T>(options: ServiceCallOptions): Promise<T> {
    return this.call({
      ...options,
      method: 'PUT',
    });
  }
  async patch<T>(options: ServiceCallOptions): Promise<T> {
    return this.call({
      ...options,
      method: 'PUT',
    });
  }

  // static handleError(code: number) {
  //   return HttpCodeError[code];
  // }
}

export { Service };
