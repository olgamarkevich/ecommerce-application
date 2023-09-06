export const prepareProductAndCategoryQueryParams = (
  slug: string,
  searchParams?: URLSearchParams,
): URLSearchParams => {
  // TODO add allowed params
  const allowedParamsFields = ['where', 'limit', 'offset'];

  const params = new URLSearchParams();
  if (slug) params.set('where', `slug(en="${slug}")`);

  if (searchParams) {
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
  }

  for (const key of params.keys()) {
    if (!allowedParamsFields.includes(key)) {
      params.delete(key);
    }
  }

  return params;
};
