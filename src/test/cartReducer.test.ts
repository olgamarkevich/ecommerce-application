import reducer, {
  setNullCart,
  setCart,
  addUpdateActions,
  clearUpdateActions,
} from '../store/cartSlice';
import type { CartState } from '../types/storeTypes';

const initialState: CartState = {
  cartId: undefined,
  version: undefined,
  products: [],
  updateActions: [],
  totalProductsQuantity: undefined,
  totalPrice: undefined,
  discountCodes: [],
};

describe('cartReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('setNullCart should set null to cartId', () => {
    expect(reducer(initialState, setNullCart())).toEqual({
      ...initialState,
      cartId: null,
    });
  });

  test('setCart should set new cart', () => {
    expect(
      reducer(
        initialState,
        setCart({
          cartId: 'id',
          version: 1,
          products: [],
          totalProductsQuantity: 0,
          totalPrice: 0,
          discountCodes: [],
        }),
      ),
    ).toEqual({
      cartId: 'id',
      version: 1,
      products: [],
      updateActions: [],
      totalProductsQuantity: 0,
      totalPrice: 0,
      discountCodes: [],
    });
  });

  test('addUpdateActions should add actions', () => {
    expect(
      reducer(
        initialState,
        addUpdateActions([{ action: 'addLineItem', sku: 'sku', quantity: 1 }]),
      ),
    ).toEqual({
      ...initialState,
      updateActions: [{ action: 'addLineItem', sku: 'sku', quantity: 1 }],
    });
  });

  test('clearUpdateActions should clear update actions', () => {
    expect(
      reducer(
        {
          ...initialState,
          updateActions: [{ action: 'addLineItem', sku: 'sku', quantity: 1 }],
        },
        clearUpdateActions(),
      ),
    ).toEqual(initialState);
  });
});
