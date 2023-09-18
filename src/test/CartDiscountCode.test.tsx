import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './renderWithProvider';
import CartDiscountCode from '../components/CartDiscountCode/CartDiscountCode';

describe('CartDiscountCode should be rendered correctly', () => {
  test('It should provide input field for code', () => {
    renderWithProviders(<CartDiscountCode total={0} totalWithoutCode={0} />);

    expect(screen.getByPlaceholderText(/have code/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/you save/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/code applied/i)).not.toBeInTheDocument();
  });

  test('It should provide message when code applied', () => {
    renderWithProviders(
      <CartDiscountCode total={90} totalWithoutCode={100} />,
      {
        preloadedState: {
          cart: {
            cartId: 'id',
            version: 1,
            products: [],
            updateActions: [],
            totalProductsQuantity: 1,
            totalPrice: 90,
            discountCodes: ['codeId'],
          },
        },
      },
    );

    expect(screen.getByText(/you save \$0.1/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/code applied/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/have code/i)).not.toBeInTheDocument();
  });

  test('It should allow code input', async () => {
    renderWithProviders(<CartDiscountCode total={0} totalWithoutCode={0} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
    await act(async () => {
      await userEvent.type(input, 'code');
    });
    expect(input.value).toBe('code');
  });

  test('It should handle code submitting', async () => {
    const { store } = renderWithProviders(
      <CartDiscountCode total={0} totalWithoutCode={0} />,
    );

    store.dispatch = jest.fn();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(input, 'code');
      await userEvent.click(button);
    });

    const { calls } = (store.dispatch as jest.Mock).mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0].payload[0]).toEqual({
      action: 'addDiscountCode',
      code: 'code',
    });
  });
});
