import { IBaseRequest, IBaseRequestOptions } from '@request-io/core';

/**
 * Fetch request
 * 目前仅支持 json 格式的请求
 */
export class FetchRequest implements IBaseRequest {
  controller: AbortController | null = null;
  async request<T>(options: IBaseRequestOptions) {
    const { method, url, abort, params = {}, data } = options;

    let finalUrl = url;
    const paramsStr = new URLSearchParams(params).toString();
    finalUrl += finalUrl.includes('?') ? `&${paramsStr}` : `?${paramsStr}`;

    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    if (abort) {
      if (this.controller) {
        this.controller.abort();
      }

      this.controller = new AbortController();

      const signal = this.controller.signal;
      Object.assign(requestOptions, {
        signal,
      });
    }

    const res = await fetch(finalUrl, requestOptions);
    const result: T = await res.json();
    return result;
  }
}
