import { IBaseError, IBaseRequest, IBaseRequestOptions } from "../types";

/**
 * Fetch request
 * 目前仅支持 json 格式的请求
 */
export class FetchRequest<E = IBaseError> implements IBaseRequest<E> {
  async request<T>(options: IBaseRequestOptions) {
    const { method, url, params = {}, data } = options;
    let finalUrl = url;

    const paramsStr = new URLSearchParams(params).toString();
    finalUrl += finalUrl.includes("?") ? `&${paramsStr}` : `?${paramsStr}`;

    const res = await fetch(finalUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: T = await res.json();
    return result;
  }
}
