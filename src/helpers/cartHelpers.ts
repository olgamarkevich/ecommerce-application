import type { Cart as ApiCart } from '@commercetools/platform-sdk';
import type { Cart as StoreCart } from '../types/storeTypes';

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
