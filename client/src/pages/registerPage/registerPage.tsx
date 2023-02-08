import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthComponent } from '../../componets/authComponent';
import { useAppDispatch } from '/src/features/hooks/hooks';
import { fetchRegister } from '/src/features/slices/authSlice';
import { EMessages, InputErrors } from '/src/types/enums';
import { IUser } from '/src/types/types';
import { regexpEmail, regexpNumbers, regexpWords } from '/src/utils/regexp';
import './registerPage.scss';
import { Notification } from '/src/componets/notification';

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      nick_name: '',
      phone_number: null,
      email: '',
      password: '',
    },
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
      setIsShowNotification(true);
      setIsErrorMessage(true);
    }
  };

  return (
    <>
      <section className="register-section container">
        <div className="register-block">
          <AuthComponent to="login" title="Sign up" content="Login here !" />

          <form className="primary-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="primary-form__input-wrapper">
              <div className="primary-form__field-block--margins">
                <label className="primary-form__label">First name</label>

                <input
                  className="primary-form__input primary-form__input--margins"
                  type="text"
                  placeholder="Enter your First name"
                  {...register('first_name', {
                    required: InputErrors.REQUIRED,
                    minLength: {
                      value: 4,
                      message: InputErrors.MIN_LENGTH,
                    },
                    pattern: {
                      value: regexpWords,
                      message: InputErrors.PATTERN,
                    },
                    maxLength: {
                      value: 30,
                      message: InputErrors.MAX_LENGTH,
                    },
                  })}
                />

                <div className="modal-card__message">
                  {errors?.first_name &&
                    `${errors?.first_name?.message || InputErrors.ERROR}`}
                </div>
              </div>

              <div className="primary-form__field-block--margins">
                <label className="primary-form__label">Last name</label>

                <input
                  className="primary-form__input primary-form__input--margins"
                  type="text"
                  placeholder="Enter your Last name"
                  {...register('last_name', {
                    required: InputErrors.REQUIRED,
                    minLength: {
                      value: 4,
                      message: InputErrors.MIN_LENGTH,
                    },
                    pattern: {
                      value: regexpWords,
                      message: InputErrors.PATTERN,
                    },
                    maxLength: {
                      value: 30,
                      message: InputErrors.MAX_LENGTH,
                    },
                  })}
                />

                <div className="modal-card__message">
                  {errors?.last_name &&
                    `${errors?.last_name?.message || InputErrors.ERROR}`}
                </div>
              </div>

              <div className="primary-form__field-block--margins">
                <label className="primary-form__label">Username</label>

                <input
                  className="primary-form__input primary-form__input--margins"
                  type="text"
                  placeholder="Enter your User name"
                  {...register('nick_name', {
                    required: InputErrors.REQUIRED,
                    minLength: {
                      value: 4,
                      message: InputErrors.MIN_LENGTH,
                    },
                    pattern: {
                      value: regexpWords,
                      message: InputErrors.PATTERN,
                    },
                    maxLength: {
                      value: 30,
                      message: InputErrors.MAX_LENGTH,
                    },
                  })}
                />

                <div className="modal-card__message">
                  {errors?.nick_name &&
                    `${errors?.nick_name?.message || InputErrors.ERROR}`}
                </div>
              </div>

              <div className="primary-form__field-block--margins">
                <label className="primary-form__label">Phone</label>

                <input
                  {...register('phone_number', { required: 'enter data' })}
                  className="primary-form__input primary-form__input--margins"
                  type="phone"
                  placeholder="Enter your Phone"
                  {...register('phone_number', {
                    required: InputErrors.REQUIRED,
                    pattern: {
                      value: regexpNumbers,
                      message: InputErrors.PATTERN,
                    },
                    minLength: {
                      value: 10,
                      message: InputErrors.MIN_LENGTH_PHONE,
                    },
                    maxLength: {
                      value: 30,
                      message: InputErrors.MAX_LENGTH,
                    },
                  })}
                />

                <div className="modal-card__message">
                  {errors?.phone_number &&
                    `${errors?.phone_number?.message || InputErrors.ERROR}`}
                </div>
              </div>

              <div className="primary-form__field-block--margins">
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

              <div className="primary-form__field-block--margins">
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
              Sign up
            </button>
          </form>
        </div>

        <div className="register-block__image-wrapper">
          <div className="register-block__image"></div>
        </div>
      </section>

      <Notification
        message={EMessages.REGISTER_ERROR_MSG}
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
        isErrorMessage={isErrorMessage}
      />
    </>
  );
};
