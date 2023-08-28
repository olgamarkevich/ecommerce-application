export const prepareCatalogQueryParams = (
  categoryId: string | undefined,
  searchParams: URLSearchParams,
): URLSearchParams => {
  // Add allowed params
  const allowedParamsFields = ['where', 'limit', 'offset'];

  const params = new URLSearchParams();

  if (categoryId) {
    params.set('where', `categories(id="${categoryId}")`);
  }

  if (searchParams) {
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
  }

  const getDefaultLimit = () => {
    const defaultProductsPerPageLimit = '12';
    params.append('limit', defaultProductsPerPageLimit);

    return defaultProductsPerPageLimit;
  };

  const limit = params.has('limit') ? params.get('limit') : getDefaultLimit();

  const getPageToShow = () => {
    const defaultPageNumber = 1;

    if (params.has('page')) {
      const pageNumber = params.get('page');
      params.delete('page');

      return pageNumber;
    }

    return params.has('offset')
      ? String(+(params.get('offset') as string) / +(limit as string) + 1)
      : defaultPageNumber;
  };

  const pageNumber = getPageToShow();
  const offset = String(+(limit as string) * (+(pageNumber as string) - 1));
  params.set('offset', offset);

  for (const key of params.keys()) {
    if (!allowedParamsFields.includes(key)) {
      params.delete(key);
    }
  }

  return params;
};
