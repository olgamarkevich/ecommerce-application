import type { ProductProjection } from '@commercetools/platform-sdk';

export const prepareOptions = (products: ProductProjection[]) => {
  const attributesHeap: { name: string; value: { en: string } | number }[] = [];
  const pricesHeap: number[] = [];

  products.forEach((product) => {
    if (product && product.masterVariant.attributes) {
      attributesHeap.push(...product.masterVariant.attributes);
    }

    if (product && product.masterVariant.prices) {
      const priceObj = product.masterVariant.prices[0];
      const price =
        'discounted' in priceObj && priceObj.discounted
          ? priceObj.discounted.value.centAmount
          : priceObj.value.centAmount;
      pricesHeap.push(price);
    }

    if (product && product.variants) {
      product.variants.forEach((variant) => {
        if (variant.attributes) {
          attributesHeap.push(...variant.attributes);
        }

        if (variant.prices) {
          const priceObj = variant.prices[0];
          const price =
            'discounted' in priceObj && priceObj.discounted
              ? priceObj.discounted.value.centAmount
              : priceObj.value.centAmount;
          pricesHeap.push(price);
        }
      });
    }
  });

  const attributesOptions: Record<string, string[]> = attributesHeap.reduce(
    (acc, item) => {
      if (!(item.name in acc)) acc[item.name] = [];

      const value =
        typeof item.value === 'object' ? item.value.en : String(item.value);

      if (!acc[item.name].includes(value)) {
        acc[item.name].push(value);
      }

      return acc;
    },
    {} as Record<string, string[]>,
  );

  const priceOptions = [...new Set(pricesHeap).values()]
    .sort((a, b) => {
      return a - b;
    })
    .map((price) => {
      return { value: price, label: String(price / 100) };
    });

  return { attributesOptions, priceOptions };
};

export const attributeSortCallback = (a: string, b: string): number => {
  if (a === 'vendor') return -1;
  if (b === 'vendor') return 1;
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
};
