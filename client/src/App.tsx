import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/register';
import styles from './app.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  );
};
