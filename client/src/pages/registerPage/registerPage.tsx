import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '/src/features/hooks/hooks';
import { fetchRegister } from '/src/features/slices/authSlice';
import { IUser } from '/src/types/types';
import { AuthComponent } from '../../componets/authComponent';
import './registerPage.scss';

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IUser>({
    defaultValues: {
      first_name: '',
      last_name: '',
      nick_name: '',
      phone_number: null,
      email: '',
      password: '',
    }
  });

  const onSubmit = async (values: IUser) => {
    try {
      const data = await dispatch(fetchRegister(values));
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
    <section className="register-section container">
      <div className="register-block">
        <AuthComponent
          to='login'
          title='Sign up'
          content='Login here !'
        />

        <form
          className="primary-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="primary-form__input-wrapper">
            <label className="primary-form__label">First name</label>

            <input
              {...register('first_name', { required: 'enter data' })}
              className="primary-form__input primary-form__input--margins"
              type="text"
              placeholder='Enter your First name'
            />

            <label className="primary-form__label">Last name</label>

            <input
              {...register('last_name', { required: 'enter data' })}
              className="primary-form__input primary-form__input--margins"
              type="text"
              placeholder='Enter your Last name'
            />

            <label className="primary-form__label">Username</label>

            <input
              {...register('nick_name', { required: 'enter data' })}
              className="primary-form__input primary-form__input--margins"
              type="text"
              placeholder='Enter your User name'
            />

            <label className="primary-form__label">Phone</label>

            <input
              {...register('phone_number', { required: 'enter data' })}
              className="primary-form__input primary-form__input--margins"
              type="phone"
              placeholder='Enter your Phone'
            />

            <label className="primary-form__label">Email</label>

            <input
              {...register('email', { required: 'enter data' })}
              className="primary-form__input primary-form__input--margins"
              type="email"
              placeholder='Enter your email address'
            />

            <label className="primary-form__label">Password</label>

            <input
              {...register('email', { required: 'enter data' })}
              className="primary-form__input primary-form__input--margins"
              type="password"
              placeholder='Enter your Password'
            />
          </div>

          <button type='submit' className="primary-form__button">
            Sign up
          </button>
        </form >
      </div >

      <div className="register-block__image-wrapper">
        <div className="register-block__image"></div>
      </div>
    </section>
  )
}

