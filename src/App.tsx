import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import { Login, Main, Page404, SignUp } from 'pages';
import { useInit } from './hooks/hooks';

function App() {
  useInit();

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='wrapper'>
          <Routes>
            <Route path='/' index element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
