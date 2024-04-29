import { CacheTypeEnum } from "./enums";

export type CacheConfig = Partial<{
  enable: boolean;
  maxAge: number;
  type: `${CacheTypeEnum}`;
}>;

export interface ServiceOptions {
  baseUrl: string;
  http: IBaseRequest<IBaseError>;
  maxRetries?: number;
  cache?: CacheConfig;
}

export interface ServiceCallOptions {
  apiName: string;
  params?: Record<string, unknown>;
  maxRetries?: number;
  cache?: CacheConfig;
  options?: Partial<
    {
      method: string;
    } & Record<string, unknown>
  >;
}

export interface IBaseError {
  code: number;
  msg: string;
}

export type IBaseRequestOptions = { method: string; url: string } & Partial<{
  params?: Record<string, never>;
  data?: Record<string, never>;
  [key: string]: unknown;
}>;

export interface IBaseRequest<E = IBaseError> {
  request: <T>(options: IBaseRequestOptions) => Promise<T extends E ? E : T>;
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
