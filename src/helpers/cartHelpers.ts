import type {
  Cart as ApiCart,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
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

export const getCartUpdateSuccessMessage = (
  actions: MyCartUpdateAction[],
  prevProducts: LineItem[],
  nextProducts: LineItem[],
): string => {
  const { action } = actions[0];
  const sku: string | undefined =
    'sku' in actions[0] ? actions[0].sku : undefined;
  const lineItemId: string | undefined =
    'lineItemId' in actions[0] ? actions[0].lineItemId : undefined;
  const quantity: number | undefined =
    'quantity' in actions[0] ? actions[0].quantity : undefined;

  let productName = '';

  if (sku) {
    productName = nextProducts.filter((item) => {
      return item.variant.sku === sku;
    })[0].name.en;
  }

  if (lineItemId) {
    productName = prevProducts.filter((item) => {
      return item.id === lineItemId;
    })[0].name.en;
  }

  if (actions.length > 1 && action === 'removeLineItem') {
    return 'Shopping Cart cleared';
  }

  if (action === 'removeLineItem' && quantity && productName.length) {
    return `${quantity} of ${productName} removed from Cart`;
  }

  if (action === 'removeLineItem' && productName.length) {
    return `${productName} removed from Cart`;
  }

  if (action === 'addLineItem' && quantity && productName.length) {
    return `${quantity} of ${productName} added to Cart`;
  }

  if (action === 'addLineItem' && productName.length) {
    return `${productName} added to Cart`;
  }

  if (action === 'addDiscountCode') {
    return 'Discount applied';
  }

  if (action === 'removeDiscountCode') {
    return 'Discount removed';
  }

  return 'Shopping Cart updated';
};
