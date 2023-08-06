import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '/src/features/hooks/hooks';
import { selectIsLogin } from '/src/features/slices/authSlice';
import { LoginPage } from '/src/pages/loginPage';

export const ProtectedRoutes: React.FC = () => {
  const isLogin = useAppSelector(selectIsLogin);
  const isAuth = window.localStorage.getItem('access_token') || isLogin;

  useEffect(() => {}, [isAuth, isLogin]);
  return isAuth ? <Outlet /> : <LoginPage />;
};
