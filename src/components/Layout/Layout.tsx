import React, { type FC } from 'react';
import { Header } from '../index';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <div className='App'>
      <Header />
      <div className='wrapper'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
