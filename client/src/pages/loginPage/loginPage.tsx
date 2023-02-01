import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './loginPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { fetchAuth, selectIsAuth } from '../../features/slices/authSlice';
import { ILogin } from '../../types/types';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: ILogin) => {
    dispatch(fetchAuth(data));
  };
  console.log(isAuth)

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginBlock}>
        <h2 className={styles.title}>
          Sign in
        </h2>

        <p className={styles.description}>
          If you don’t have an account register <br />
          You can
          <Link
            to={'/register'}
            className={styles.link}
          >
            Register here !
          </Link>
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Email</label>

            <input
              className={styles.input}
              type="text"
              {...register('email', { required: 'enter data' })}
              placeholder='Enter your email address'
            />

            <label className={styles.label}>Password</label>

            <input
              className={styles.input}
              type="password"
              {...register('password', { required: 'enter data' })}
              placeholder='Enter your Password'
            />
          </div>

          <button type='submit' className={styles.button}>Login</button>
        </form >
      </div >
    </section>
  )
}
