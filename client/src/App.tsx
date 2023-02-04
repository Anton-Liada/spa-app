import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { HomePage } from './pages/homePage';
import { useAppDispatch, useAppSelector } from './features/hooks/hooks';
import { fetchAuth, selectIsLogin } from './features/slices/authSlice';
import { Header } from './componets/header';
import { SingleCompanyPage } from './pages/singleCompanyPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsLogin);

  useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    <>
      {isAuth && <Header />}

        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path="/companies/:id" element={<SingleCompanyPage />} />
        </Routes>
    </>
  );
};
