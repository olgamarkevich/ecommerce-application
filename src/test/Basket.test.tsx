import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './renderWithProvider';
import Basket from '../components/Basket/Basket';

describe('Basket icon should render correctly', () => {
  test('Basket should not show null quantity', () => {
    renderWithProviders(<Basket />, {
      preloadedState: {
        cart: {
          cartId: 'id',
          version: 1,
          products: [],
          updateActions: [],
          totalProductsQuantity: 0,
          totalPrice: 90,
          discountCodes: ['codeId'],
        },
      },
    });

    expect(screen.queryByText(/0/)).not.toBeInTheDocument();
  });

  test('Basket should show quantity', () => {
    renderWithProviders(<Basket />, {
      preloadedState: {
        cart: {
          cartId: 'id',
          version: 1,
          products: [],
          updateActions: [],
          totalProductsQuantity: 7,
          totalPrice: 90,
          discountCodes: ['codeId'],
        },
      },
    });

    expect(screen.getByText(/7/)).toBeInTheDocument();
  });

  test('Basket should show quantity', () => {
    renderWithProviders(<Basket />, {
      preloadedState: {
        cart: {
          cartId: 'id',
          version: 1,
          products: [],
          updateActions: [],
          totalProductsQuantity: 78,
          totalPrice: 90,
          discountCodes: ['codeId'],
        },
      },
    });

    expect(screen.getByText(/78/)).toBeInTheDocument();
  });
});
