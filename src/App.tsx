import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Main, Page404, SignUp } from 'pages';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './hoc/ProtectedRoute';
import useInit from './hooks/useInit';
import './App.css';

function App() {
  useInit();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route
          path='login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='signup'
          element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
