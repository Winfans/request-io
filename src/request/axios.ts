import axios, { CancelTokenSource } from "axios";
import { IBaseError, IBaseRequest, IBaseRequestOptions } from "../types";
import { TIMEOUT } from "../constants";

const http = axios.create({
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export class AxiosRequest<E = IBaseError> implements IBaseRequest<E> {
  private cancelTokenSource: CancelTokenSource | null = null;
  async request<T>(options: IBaseRequestOptions) {
    const { abort, ...rest } = options;

    let requestOptions = {
      ...rest,
    };

    if (abort) {
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel();
      }
      this.cancelTokenSource = axios.CancelToken.source();
      requestOptions = {
        ...requestOptions,
        cancelToken: this.cancelTokenSource.token,
      };
    }

    // try {
    const { data } = await http.request<T extends E ? E : T>(requestOptions);
    return data;
    // } catch (e) {
    //   console.log("e", e);
    // }
  }
}
