import React, { type FC } from 'react';
import { Header } from '../index';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import PopUp from '../PopUp/PopUp';
import { useAppSelector } from '../../hooks/hooks';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Layout: FC = () => {
  const { isLoading, textInfo } = useAppSelector((state) => {
    return state.app;
  });

  return (
    <div className='App relative'>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumbs />
      <div className='wrapper relative overflow-x-hidden'>
        {textInfo && (
          <PopUp text={textInfo.msgText} isOnView={textInfo.isOnView} />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
