import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './renderWithProvider';
import CartButton from '../components/Buttons/CartButton/CartButton';
import type { CartState } from '../types/storeTypes';
import type { LineItem } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';

const products: LineItem[] = [
  {
    id: 'id',
    productId: 'productId',
    name: { en: 'Name' },
    productType: {
      typeId: 'product-type',
      id: 'some',
    },
    variant: {
      id: 1,
      sku: 'productSKU',
    },
    price: {
      id: 'priceId',
      value: {
        type: 'centPrecision',
        centAmount: 100,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
    quantity: 1,
    totalPrice: {
      type: 'centPrecision',
      centAmount: 100,
      currencyCode: 'USD',
      fractionDigits: 2,
    },
    discountedPricePerQuantity: [],
    taxedPricePortions: [],
    state: [],
    perMethodTaxRate: [],
    priceMode: '',
    lineItemMode: '',
  },
];

const cart: CartState = {
  cartId: 'id',
  version: 1,
  products,
  updateActions: [],
  totalProductsQuantity: 1,
  totalPrice: 100,
  discountCodes: [],
};

describe('CartButton should be rendered correctly', () => {
  test('It should have Add-to-cart state, when sku is not in Cart', () => {
    renderWithProviders(<CartButton sku={'notSKU'} />, {
      preloadedState: { cart },
    });

    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    expect(screen.queryByText(/remove all/i)).not.toBeInTheDocument();
  });

  test('It should have Remove-all state, when sku is in Cart', () => {
    renderWithProviders(<CartButton sku={'productSKU'} />, {
      preloadedState: { cart },
    });

    expect(screen.getByText(/remove all/i)).toBeInTheDocument();
    expect(screen.queryByText(/add to cart/i)).not.toBeInTheDocument();
  });

  test('It should dispatch add-to-cart action', async () => {
    const { store } = renderWithProviders(<CartButton sku={'notSKU'} />, {
      preloadedState: { cart },
    });

    const button = screen.getByText(/add to cart/i);
    expect(button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(button);
    });

    expect(store.getState().cart.updateActions[0]).toEqual({
      action: 'addLineItem',
      sku: 'notSKU',
      quantity: 1,
    });
  });

  test('It should dispatch remove-all action', async () => {
    const { store } = renderWithProviders(<CartButton sku={'productSKU'} />, {
      preloadedState: { cart },
    });

    const button = screen.getByText(/remove all/i);
    expect(button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(button);
    });

    expect(store.getState().cart.updateActions[0]).toEqual({
      action: 'removeLineItem',
      lineItemId: 'id',
    });
  });

  test('It should dispatch add-one action', async () => {
    const { store } = renderWithProviders(<CartButton sku={'productSKU'} />, {
      preloadedState: { cart },
    });

    const button = screen.getByText(/\+/);
    expect(button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(button);
    });

    expect(store.getState().cart.updateActions[0]).toEqual({
      action: 'addLineItem',
      sku: 'productSKU',
      quantity: 1,
    });
  });

  test('It should dispatch remove-one action', async () => {
    const { store } = renderWithProviders(<CartButton sku={'productSKU'} />, {
      preloadedState: { cart },
    });

    const button = screen.getByText(/-/);
    expect(button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(button);
    });

    expect(store.getState().cart.updateActions[0]).toEqual({
      action: 'removeLineItem',
      lineItemId: 'id',
      quantity: 1,
    });
  });

  test('It should dispatch remove-one action', async () => {
    renderWithProviders(<CartButton sku={'notSKU'} />, {
      preloadedState: { cart },
    });

    const minusButton = screen.getByText(/-/);
    const plusButton = screen.getByText(/\+/);
    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(plusButton);
      await userEvent.click(plusButton);
    });

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(plusButton);
      await userEvent.click(plusButton);
    });

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(minusButton);
      await userEvent.click(minusButton);
      await userEvent.click(minusButton);
    });

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
