import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  RouterProvider,
  createMemoryRouter,
  type RouteObject,
  Link,
} from 'react-router-dom';
import { renderWithProviders } from './renderWithProvider';
import Layout from '../components/Layout/Layout';

import Cart from '../pages/cart/Cart';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    handle: {
      crumb: () => {
        return <Link to={'/'}>Home</Link>;
      },
    },
    children: [
      {
        path: 'cart',
        element: <Cart />,
        handle: {
          crumb: () => {
            return <Link to={'/cart'}>Shopping Cart</Link>;
          },
        },
      },
    ],
  },
];

describe('Breadcrumbs should render correctly', () => {
  test('It should be on Cart Page', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/cart'],
    });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getAllByText(/shopping cart/i)).toHaveLength(2);
  });
});
