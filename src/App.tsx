import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Main, Page404, SignUp } from 'pages';
import Layout from './components/Layout/Layout';
import useInit from './hooks/useInit';
import './App.css';
import Profile from './pages/profile/Profile';
import Categories from './pages/categories/Categories';
import Catalog from './pages/catalog/Catalog';
import Product from './pages/product/Product';
import AnonymousRoute from './hoc/AnonymousRoute';
import ProtectedRoute from './hoc/ProtectedRoute';

function App() {
  useInit();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='categories' element={<Categories />} />
        <Route path='products/:categorySlug?' element={<Catalog />} />
        <Route path='product/:productSlug' element={<Product />} />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='login'
          element={
            <AnonymousRoute>
              <Login />
            </AnonymousRoute>
          }
        />
        <Route
          path='signup'
          element={
            <AnonymousRoute>
              <SignUp />
            </AnonymousRoute>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
