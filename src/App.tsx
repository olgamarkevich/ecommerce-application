import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import { Login, Main, Page404, SignUp } from 'pages';
import { useGetAnonymousTokenQuery } from './api/authApi';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { receiveCustomerFromLocalStorage } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const { isDataLoaded, customerId } = useAppSelector((state) => {
    return state.auth;
  });

  // Load customer data from local storage when start App
  useEffect(() => {
    if (!customerId) {
      dispatch(receiveCustomerFromLocalStorage());
    }
  }, [dispatch, customerId]);

  // Fetch anonymous token if no customerId saved and after setting data from storage
  const { data: authData } = useGetAnonymousTokenQuery(undefined, {
    skip: !!customerId || !isDataLoaded,
  });
  console.log(authData);

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
