import axios, { CancelTokenSource } from 'axios';
import { IBaseRequest, IBaseRequestOptions } from '@request-io/core';
import { TIMEOUT } from './constants';

const http = axios.create({
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class AxiosRequest implements IBaseRequest {
  private cancelTokenSource: CancelTokenSource | null = null;
  async request<T>(options: IBaseRequestOptions): Promise<T> {
    const { abort, ...rest } = options;

    const requestOptions = {
      ...rest,
    };

    if (abort) {
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel();
      }
      this.cancelTokenSource = axios.CancelToken.source();
      Object.assign(requestOptions, {
        cancelToken: this.cancelTokenSource.token,
      });
    }

    // try {
    const { data } = await http.request<T>(requestOptions);
    return data;
    // } catch (e) {
    //   console.log("e", e);
    // }
  }
}
