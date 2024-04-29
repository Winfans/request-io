import { CacheTypeEnum } from "../enums";
import { IBaseCache, IBaseCacheValue } from "../types";

export class MemoryCache implements IBaseCache {
  private cache: Map<string, IBaseCacheValue> = new Map();

  has(key: string) {
    return this.cache.has(key);
  }

  get(key: string) {
    const record = this.cache.get(key);
    if (record) {
      if (record.expires) {
        if (record.expires > Date.now()) {
          return record.value;
        }
        this.cache.delete(key);
      }
      return record.value;
    }
  }

  set(key: string, value: unknown, maxAge?: number) {
    if (maxAge) {
      this.cache.set(key, {
        value,
        expires: Date.now() + maxAge,
      });
    } else {
      this.cache.set(key, {
        value,
      });
    }
  }
}

export const cacheMap: Record<CacheTypeEnum, IBaseCache> = {
  [CacheTypeEnum.MEMORY]: new MemoryCache(),
  // [CacheTypeEnum.LOCAL_STORAGE]: undefined,
  // [CacheTypeEnum.SESSION_STORAGE]: undefined
};
