import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import LinkItemSVG from 'components/LinkItem/LinkItemSVG/LinkItemSVG';
import Basket from 'components/Basket/Basket';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { removeCustomer } from '../../../store/customerSlice';
import { logoutCustomer } from '../../../store/authSlice';
import {
  setAuthorizationState,
  setCustomerLoggedState,
} from '../../../store/appSlice';
import { ReactComponent as ProfileSVG } from '../../../assets/svg/profile.svg';
import { ReactComponent as LogOutSVG } from '../../../assets/svg/logout.svg';
import { ReactComponent as SignUpSVG } from '../../../assets/svg/sign-up.svg';
import { ReactComponent as LoginSVG } from '../../../assets/svg/login.svg';
import { ReactComponent as AboutSVG } from '../../../assets/svg/about-us.svg';

const LinkIconButtons: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { isCustomerLogged } = useAppSelector((state) => {
    return state.app;
  });

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setAuthorizationState(false));
    await dispatch(logoutCustomer());
    dispatch(removeCustomer());
    dispatch(setCustomerLoggedState(false));
  };
  return (
    <ul className={`right-4 top-4 flex ${className}`}>
      {!isCustomerLogged && (
        <li className=''>
          <LinkItemSVG to='/about_us'>
            <AboutSVG />
          </LinkItemSVG>
        </li>
      )}
      {!isCustomerLogged && (
        <li className=''>
          <LinkItemSVG to='/login'>
            <LoginSVG />
          </LinkItemSVG>
        </li>
      )}
      {!isCustomerLogged && (
        <li className=''>
          <LinkItemSVG to='/signup'>
            <SignUpSVG />
          </LinkItemSVG>
        </li>
      )}
      {isCustomerLogged && (
        <li className=''>
          <LinkItemSVG to='/profile'>
            <ProfileSVG />
          </LinkItemSVG>
        </li>
      )}
      {isCustomerLogged && (
        <li className=''>
          <LinkItemSVG to='/' onClick={logoutHandler}>
            <LogOutSVG />
          </LinkItemSVG>
        </li>
      )}
      <li className=''>
        <LinkItemSVG to='/cart'>
          <Basket />
        </LinkItemSVG>
      </li>
    </ul>
  );
};

export default LinkIconButtons;
