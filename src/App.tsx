import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import { Login, Main, Page404, SignUp } from 'pages';
import { useGetAnonymousTokenQuery } from './api/authApi';
import {
  useAppSelector,
  useCustomerAuthorization,
  useSavedToken,
} from './hooks/hooks';

function App() {
  const { isDataLoaded, customerId } = useAppSelector((state) => {
    return state.auth;
  });

  // Load customer data from local storage when start App
  useSavedToken(isDataLoaded);

  // Fetch anonymous token if no customerId saved and after setting data from storage
  const { data: authData } = useGetAnonymousTokenQuery(undefined, {
    skip: !!customerId || !isDataLoaded,
  });

  // Set customer authorization data
  useCustomerAuthorization(authData);

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
