import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthComponent } from '../../componets/authComponent';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { fetchLogin } from '../../features/slices/authSlice';
import { ILogin } from '../../types/types';
import { InputErrors } from '/src/types/enums';
import { regexpEmail } from '/src/utils/regexp';
import { Notification } from '/src/componets/notification';
import './loginPage.scss';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const message = useAppSelector(state => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onChange',
    defaultValues: {
      email: 'liadaanton@gmail.com',
      password: '775577',
    },
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
      setIsShowNotification(true);
      setIsErrorMessage(true);
    }
  };

  return (
    <>
      <section className="login-section contai">
        <div className="login-block">
          <AuthComponent
            to="register"
            content="Register here !"
            title="Sign in"
          />

          <form className="primary-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="primary-form__input-wrapper">
              <div className="primary-form__field-block">
                <label className="primary-form__label">Email</label>

                <input
                  className="primary-form__input"
                  type="text"
                  placeholder="Enter your Email address"
                  {...register('email', {
                    required: InputErrors.REQUIRED,
                    pattern: {
                      value: regexpEmail,
                      message: InputErrors.PATTERN_EMAIL,
                    },
                    maxLength: {
                      value: 30,
                      message: InputErrors.MAX_LENGTH,
                    },
                  })}
                />

                <div className="modal-card__message">
                  {errors?.email &&
                    `${errors?.email?.message || InputErrors.ERROR}`}
                </div>
              </div>

              <div className="primary-form__field-block">
                <label className="primary-form__label">Password</label>

                <input
                  className="primary-form__input"
                  type="password"
                  placeholder="Enter your Password"
                  {...register('password', {
                    required: InputErrors.REQUIRED,
                    minLength: {
                      value: 6,
                      message: InputErrors.MIN_LENGTH_PASSWORD,
                    },
                    maxLength: {
                      value: 15,
                      message: InputErrors.MAX_LENGTH,
                    },
                  })}
                />

                <div className="modal-card__message">
                  {errors?.password &&
                    `${errors?.password?.message || InputErrors.ERROR}`}
                </div>
              </div>
            </div>

            <button type="submit" className="primary-form__button">
              Sign in
            </button>
          </form>
        </div>
      </section>

      <Notification
        message={message}
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
        isErrorMessage={isErrorMessage}
      />
    </>
  );
};
