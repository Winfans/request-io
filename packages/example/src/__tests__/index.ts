import { testGet, testGetWithMemory, apiService, getCacheKey } from '../services';

test('test get', async () => {
  const res = await testGet({ content: 'testGet' });
  expect(res.data.message).toBe('testGet');
});

test('test get with memory cache', async () => {
  await testGetWithMemory({ content: 'testGet', type: 1 });
  const res = apiService.cacheStore.get(
    getCacheKey('/test', 'GET', { content: 'testGet', type: 1 }),
  ) as unknown as { data: { message: string } };
  expect(res.data.message).toBe('testGet');
});
