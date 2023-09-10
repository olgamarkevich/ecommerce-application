import React from 'react';
import {
  Link,
  type RouteObject,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Login, Main, Page404, SignUp } from 'pages';
import Layout from './components/Layout/Layout';
import useInit from './hooks/useInit';
import './App.css';
import Profile from './pages/profile/Profile';
import Catalog from './pages/catalog/Catalog';
import Product from './pages/product/Product';
import AnonymousRoute from './hoc/AnonymousRoute';
import ProtectedRoute from './hoc/ProtectedRoute';
import useCart from './hooks/useCart';
import Cart from './pages/cart/Cart';

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
        index: true,
        element: <Main />,
        handle: {
          crumb: () => {
            return <Link to={'/'}>Main</Link>;
          },
        },
      },
      {
        path: 'products/:categorySlug?',
        element: <Catalog />,
        handle: {
          crumb: (params: { categorySlug: string } | undefined) => {
            return (
              <Link
                to={
                  params && params.categorySlug
                    ? `/products/${params.categorySlug}`
                    : '/products'
                }
              >
                {params && params.categorySlug
                  ? `Category: ${params.categorySlug}`
                  : 'Catalog'}
              </Link>
            );
          },
        },
      },
      {
        path: 'product/:productSlug',
        element: <Product />,
        handle: {
          crumb: (params: { productSlug: string } | undefined) => {
            return (
              <Link
                to={
                  params && params.productSlug
                    ? `/product/${params.productSlug}`
                    : ''
                }
              >
                {params && params.productSlug
                  ? `Product: ${params.productSlug}`
                  : 'Product'}
              </Link>
            );
          },
        },
      },
      {
        path: 'cart',
        element: <Cart />,
        handle: {
          crumb: () => {
            return <Link to={'/cart'}>Shopping Cart</Link>;
          },
        },
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        handle: {
          crumb: () => {
            return <Link to={'/profile'}>Profile</Link>;
          },
        },
      },
      {
        path: 'login',
        element: (
          <AnonymousRoute>
            <Login />
          </AnonymousRoute>
        ),
        handle: {
          crumb: () => {
            return <Link to={'/login'}>Sign In</Link>;
          },
        },
      },
      {
        path: 'signup',
        element: (
          <AnonymousRoute>
            <SignUp />
          </AnonymousRoute>
        ),
        handle: {
          crumb: () => {
            return <Link to={'/signup'}>Sign Up</Link>;
          },
        },
      },
      {
        path: '*',
        element: <Page404 />,
        handle: {
          crumb: () => {
            return <Link to={'/'}>Not Found</Link>;
          },
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  useInit();
  useCart();

  return <RouterProvider router={router} />;
}

export default App;
