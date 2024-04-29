import axios from "axios";
import { IBaseError, IBaseRequest, IBaseRequestOptions } from "../types";
import { TIMEOUT } from "../constants";

const http = axios.create({
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export class AxiosRequest<E = IBaseError> implements IBaseRequest<E> {
  async request<T>(options: IBaseRequestOptions) {
    // try {
    const { data } = await http.request<T extends E ? E : T>(options);
    return data;
    // } catch (e) {
    //   console.log("e", e);
    // }
  }
}
