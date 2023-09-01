type SortValue = 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc';
type AllowedSortValues = Record<SortValue, string>;

export const prepareCatalogQueryParams = (
  categoryId: string | undefined,
  searchParams: URLSearchParams,
): URLSearchParams => {
  const allowedParamsFields = [
    'filter',
    'filter.query',
    'sort',
    'text.en',
    'fuzzy',
    'fuzzyLevel',
    'limit',
    'offset',
  ];

  const params = new URLSearchParams();

  // Add category
  if (categoryId) {
    params.set('filter.query', `categories.id:"${categoryId}"`);
  }

  // Add attributes filters
  if (searchParams.has('filter')) {
    const filterAttributes = searchParams.getAll('filter').reduce(
      (acc, item): Record<string, string[]> => {
        const [name, value] = item.split(':');

        if (!(name in acc)) acc[name] = [];

        acc[name].push(`"${value}"`);

        return acc;
      },
      {} as Record<string, string[]>,
    );

    Object.keys(filterAttributes).forEach((attrName) => {
      const attrValue = filterAttributes[attrName].join(', ');
      params.append(
        'filter',
        `variants.attributes.${attrName}.en:${attrValue}`,
      );
    });
  }

  // Add sort
  if (searchParams.has('sort')) {
    const allowedSortValues: AllowedSortValues = {
      priceAsc: 'price asc',
      priceDesc: 'price desc',
      nameAsc: 'name.en asc',
      nameDesc: 'name.en desc',
    };
    const sortValue = searchParams.get('sort') as SortValue;

    if (Object.keys(allowedSortValues).includes(sortValue)) {
      params.append('sort', allowedSortValues[sortValue]);
    }
  }

  // Add text search
  if (searchParams.has('search')) {
    const searchValue = searchParams.get('search') as string;

    params.append('text.en', searchValue);
    params.append('fuzzy', 'true');
    params.append('fuzzyLevel', '2');
  }

  // Add limit
  const getLimit = (productsPerPageLimit?: number): number => {
    const defaultProductsPerPageLimit = 12;
    const allowedProductsPerPageLimit = [12, 24, 36];

    return productsPerPageLimit &&
      allowedProductsPerPageLimit.includes(productsPerPageLimit)
      ? productsPerPageLimit
      : defaultProductsPerPageLimit;
  };

  const productsPerPageLimit = getLimit(
    searchParams.has('limit')
      ? +(searchParams.get('limit') as string)
      : undefined,
  );

  params.append('limit', String(productsPerPageLimit));

  // Add offset
  const getPageToShow = (pageNumber?: number): number => {
    const defaultPageNumber = 1;

    return pageNumber ? pageNumber : defaultPageNumber;
  };

  const pageNumber = getPageToShow(
    searchParams.has('page')
      ? +(searchParams.get('page') as string)
      : undefined,
  );

  const offset = productsPerPageLimit * (pageNumber - 1);
  params.set('offset', String(offset));

  // Remove not allowed params
  for (const key of params.keys()) {
    if (!allowedParamsFields.includes(key)) {
      params.delete(key);
    }
  }

  return params;
};
