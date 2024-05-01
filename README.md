## Introduction
一个与技术栈无关的请求库，支持接口缓存、幂等性、重试、竞态处理以及多种基础请求方案
## Quick Start

### Installation
```bash
pnpm i @request-io/core @request-io/request
```

### Usage

```typescript
import { Service } from '@request-io/core';
import { AxiosRequest } from '@request-io/request';

const BASE_URL = 'https://xxxxxxxxxxxxxxxx';

const http = new AxiosRequest();

const apiService = new Service({
  baseUrl: BASE_URL,
  http: http,
});

interface IBaseResult<T> {
  code: number;
  success: boolean;
  data: T;
  msg?: string;
}

const testGet = (params: { content: string }) => {
  return apiService.get<
    IBaseResult<{
      message: string;
    }>
  >({
    apiName: '/test',
    params,
    // maxRetries: 5,
    // cache: {
    //   enable: true,
    // },
    // abort: true,
    // idempotence: true,
  });
};

testGet({
  content: 'testGet',
})
```



