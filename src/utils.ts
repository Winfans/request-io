export const getCacheKey = (
  apiName: string,
  method = "",
  params: Record<string, unknown> = {}
) => {
  return `cache:${apiName}:${method}:${JSON.stringify(params)}`;
};
