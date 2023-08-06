import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../header';
import { ProtectedRoutes } from '../protecedRoutes';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { selectIsLogin } from '/src/features/slices/authSlice';
import { fetchProfile } from '/src/features/slices/profileSlice';
import { CompaniesPage } from '/src/pages/companiesPage';
import { HomePage } from '/src/pages/homePage';
import { LoginPage } from '/src/pages/loginPage';
import { NotFoundPage } from '/src/pages/notFoundPage';
import { ProfilePage } from '/src/pages/profilePage';
import { RegisterPage } from '/src/pages/registerPage';
import { SettingsPage } from '/src/pages/settingsPage';
import { SingleCompanyPage } from '/src/pages/singleCompanyPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);
  const isAuth = window.localStorage.getItem('access_token') || isLogin;

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchProfile());
    }
  }, [isAuth, dispatch, isLogin]);

  return (
    <>
      {isAuth && <Header />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/companies">
          <Route element={<ProtectedRoutes />}>
            <Route index element={<CompaniesPage />} />
            <Route path=":id" element={<SingleCompanyPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
