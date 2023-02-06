import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './componets/header';
import { ProtectedRoutes } from './componets/protecedRoutes';
import { useAppDispatch, useAppSelector } from './features/hooks/hooks';
import { fetchAuth, selectIsLogin } from './features/slices/authSlice';
import { fetchCompanies } from './features/slices/companiesSlice';
import { fetchProfile } from './features/slices/profileSlice';
import { CompaniesPage } from './pages/companiesPage';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { NotFoundPage } from './pages/notFoundPage';
import { ProfilePage } from './pages/profilePage';
import { RegisterPage } from './pages/registerPage';
import { SingleCompanyPage } from './pages/singleCompanyPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsLogin);

  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchCompanies());
    dispatch(fetchProfile());
  }, [isAuth, dispatch]);

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
