import React from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../features/hooks/hooks';
import { selectIsLogin } from '../../features/slices/authSlice';
import { LoginPage } from '../../pages/loginPage';

export const ProtectedRoutes: React.FC = () => {
  const isAuth = useAppSelector(selectIsLogin);

  return isAuth ? <Outlet /> : <LoginPage />;
};
