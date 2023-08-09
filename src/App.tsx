import React, { useEffect } from 'react';
import './App.css';
import { useGetAnonymousTokenQuery } from './api/authApi';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

import { receiveCustomerFromLocalStorage } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const { isDataLoaded, customerId } = useAppSelector((state) => state.auth);

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

  return <div className='App' />;
}

export default App;
