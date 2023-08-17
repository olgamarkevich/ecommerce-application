import React, { type ReactElement } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { userType } = useAppSelector((state) => {
    return state.auth;
  });

  if (userType === 'customer') {
    return <Navigate to={'/'} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
