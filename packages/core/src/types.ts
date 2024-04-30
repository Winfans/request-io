import { CacheTypeEnum } from "./enums";

export type CacheConfig = Partial<{
  enable: boolean;
  maxAge: number;
  type: `${CacheTypeEnum}`;
}>;

export interface CommonOptions {
  maxRetries?: number;
  cache?: CacheConfig;
  idempotence?: boolean; // 幂等性
  abort?: boolean; // 中断请求
}

export interface ServiceOptions extends CommonOptions {
  baseUrl: string;
  http: IBaseRequest;
}

export interface ServiceCallOptions extends CommonOptions {
  apiName: string;
  params?: Record<string, unknown>;
  method?: string;
  options?: Record<string, unknown>;
}

export type IBaseRequestOptions = { method: string; url: string } & Partial<{
  params: Record<string, never>;
  data: Record<string, never>;
  abort: boolean;
  [key: string]: unknown;
}>;

export interface IBaseRequest {
  request: <T>(options: IBaseRequestOptions) => Promise<T>;
}

export interface IBaseCache {
  has: (key: string) => boolean;
  get: (key: string) => unknown;
  set: (key: string, value: unknown, maxAge?: number) => void;
}

export interface IBaseCacheValue {
  value: unknown;
  expires?: number;
}
