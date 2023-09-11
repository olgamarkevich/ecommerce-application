import type { Cart as ApiCart } from '@commercetools/platform-sdk';
import type { Cart as StoreCart } from '../types/storeTypes';
import type { LineItem } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';

export const getCartFromResponse = (response: ApiCart): StoreCart => {
  const {
    id: cartId,
    version,
    lineItems: products,
    totalLineItemQuantity: totalProductsQuantity,
    totalPrice: { centAmount },
    discountCodes: codes,
  } = response;

  const discountCodes = codes.map((code) => {
    return code.discountCode.obj
      ? code.discountCode.obj.code
      : code.discountCode.id;
  });

  return {
    cartId,
    version,
    products,
    totalProductsQuantity,
    totalPrice: centAmount,
    discountCodes,
  };
};

export const getProductIdFromCart = (
  sku: string,
  productsInCart: LineItem[],
): string | null => {
  const matchingVariant = productsInCart.find((product) => {
    return product.variant.sku === sku;
  });

  return matchingVariant ? matchingVariant.id : null;
};

export const getProductQuantityFromCart = (
  sku: string,
  productsInCart: LineItem[],
): number => {
  const matchingVariant = productsInCart.find((product) => {
    return product.variant.sku === sku;
  });

  return matchingVariant ? matchingVariant.quantity : 0;
};
