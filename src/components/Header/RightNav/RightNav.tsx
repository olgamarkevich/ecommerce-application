import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { removeCustomer } from '../../../store/customerSlice';
import { logoutCustomer } from '../../../store/authSlice';
import { setAuthorizationState } from '../../../store/appSlice';

import LinkItem from 'components/LinkItem/LinkItem';
import style from './RightNav.module.css';

const RightNav: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => {
    return state.customer;
  });

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setAuthorizationState(false));
    await dispatch(logoutCustomer());
    dispatch(removeCustomer());
    navigate('/');
  };

  return (
    <ul
      className={`${style.ul} ${
        isOpen ? 'md:translate-x-0' : 'md:translate-x-full'
      }`}
      onClick={(e: React.MouseEvent) => {
        if (isOpen && e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      {!id && (
        <li className={style.nav__link}>
          <LinkItem to='/login'>log in</LinkItem>
        </li>
      )}
      {!id && (
        <li className={style.nav__link}>
          <LinkItem to='/signup'>sign up</LinkItem>
        </li>
      )}
      {!!id && (
        <li className={style.nav__link}>
          <LinkItem to='/' onClick={logoutHandler}>
            Log out
          </LinkItem>
        </li>
      )}
    </ul>
  );
};

export default RightNav;
