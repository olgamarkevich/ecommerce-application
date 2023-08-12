import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import { Login, Main, Page404, SignUp } from 'pages';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import {
  loadCustomerFromLocalStorage,
  setCustomerToken,
} from './store/authSlice';
import {
  setAuthorizationState,
  setInitializationState,
} from './store/appSlice';
import { useGetAnonymousTokenQuery } from './api/authApi';
import { getCustomerFromApiResponse } from './helpers/appHelpers';

function App() {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => {
    return state.app;
  });
  const { customerId } = useAppSelector((state) => {
    return state.auth;
  });

  // Fetch anonymous token if no customerId saved and after setting data from storage
  const { data: authData } = useGetAnonymousTokenQuery(undefined, {
    skip: !!customerId || !isInitialized,
  });

  // Load customer data from local storage when start App
  useEffect(() => {
    if (!isInitialized) {
      dispatch(loadCustomerFromLocalStorage()).then(() => {
        dispatch(setInitializationState(true));
      });
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (authData) {
      const customer = getCustomerFromApiResponse(authData);

      dispatch(setCustomerToken(customer)).then(() => {
        dispatch(setAuthorizationState(true));
      });
    }
  }, [dispatch, authData]);

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
