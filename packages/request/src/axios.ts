import axios, { CancelTokenSource } from 'axios';
import { IBaseRequest, IBaseRequestOptions } from '@request-client/core';
import { TIMEOUT } from './constants';
import { AxiosRequestOptions } from './types';

export class AxiosRequest implements IBaseRequest {
  private cancelTokenSource: CancelTokenSource | null = null;
  private http;
  public interceptors;
  constructor({ timeout }: AxiosRequestOptions = { timeout: TIMEOUT }) {
    this.http = axios.create({
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.interceptors = this.http.interceptors;
  }
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
    const { data } = await this.http.request<T>(requestOptions);
    return data;
    // } catch (e) {
    //   console.log("e", e);
    // }
  }
}
