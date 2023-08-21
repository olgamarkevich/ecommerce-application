import React from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Main: FC = () => {
  return (
    <>
      <h1 className={'text-xl mb-20'}>Main page</h1>
      <p className={''}>Here will be very interesting content soon...</p>
      <p className={''}>So we`ll be happy to see you again!</p>
      <p className={'my-10'}>
        <NavLink to='/login' className={'text-sky-700'}>
          Here is a link to log in page
        </NavLink>
      </p>
      <p className={'my-10'}>
        <NavLink to='/signup' className={'text-sky-700 decoration-solid'}>
          Here is a link to sign up page
        </NavLink>
      </p>
    </>
  );
};

export default Main;
