import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Main, Page404, SignUp } from 'pages';
import Layout from './components/Layout/Layout';
import { useInit } from './hooks/hooks';
import './App.css';

function App() {
  useInit();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
