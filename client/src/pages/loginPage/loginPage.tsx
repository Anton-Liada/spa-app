import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../features/hooks/hooks';
import { fetchLogin } from '../../features/slices/authSlice';
import { ILogin } from '../../types/types';
import { AuthComponent } from '../../componets/authComponent';
import './loginPage.scss';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    defaultValues: {
      email: 'ADMIN3',
      password: 'ADMIN3',
    }
  });

  const onSubmit = async (values: ILogin) => {
    try {
      const data = await dispatch(fetchLogin(values));
      if (!data.payload) {
        throw new Error('Failed to login');
      }

      if ('access_token' in data.payload) {
        window.localStorage.setItem('access_token', data.payload.access_token);
      }

      nav('/');
    } catch (error) {
      throw new Error('something went wrong')
    }
  };

  return (
    <section className="login-section contai">
      <div className="login-block">
        <AuthComponent to='register' content='Register here !' title='Sign in' />

        <form
          className="primary-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="primary-form__input-wrapper">
            <label className="primary-form__label">
              Email
            </label>

            <input
              className="primary-form__input"
              type="text"
              {...register('email', { required: 'enter Email' })}
              placeholder='Enter your Email address'
            />

            <label className="primary-form__label">
              Password
            </label>

            <input
              className="primary-form__input"
              type="password"
              {...register('password', { required: 'enter Password' })}
              placeholder='Enter your Password'
            />
          </div>

          <button type='submit' className="primary-form__button">
            Sign in
          </button>
        </form >
      </div >
    </section>
  )
}
