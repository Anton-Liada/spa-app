import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import './settingsPage.scss';
import { Notification } from '/src/componets/notification';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { updateProfile } from '/src/features/slices/profileSlice';
import { InputErrors } from '/src/types/enums';
import { IUser } from '/src/types/types';
import { regexpEmail, regexpNumbers, regexpWords } from '/src/utils/regexp';

export const SettingsPage: React.FC = () => {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile.profile);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: {
      id: profile?.id,
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      nick_name: profile?.nick_name,
      phone_number: profile?.phone_number,
      email: profile?.email,
    },
  });

  if (!profile) {
    return <h3 className="title title--position">
      Profile not found
    </h3>
  }

  const onSubmit = async (user: IUser) => {
    await dispatch(updateProfile(user));
  };

  const handleShowNotification = () => {
    setIsShowNotification(true);
  };

  return (
    <section className="settings-section container-small">
      <Notification
        message="Your profile has been successfully updated."
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
      />

      <h3 className="title">
        Your Settings
      </h3>

      <div className="img-wrapper">
        <img
          src="https://api.realworld.io/images/smiley-cyrus.jpeg"
          alt=""
          className="profile-img"
        />
      </div>

      <form className="secondary-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="secondary-form__wrapper">
          <div className="secondary-form__input-wrapper">
            <label className="secondary-form__label">First name:</label>

            <input
              type="text"
              placeholder="Enter First name"
              className="secondary-form__input"
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

            <div className="secondary-form__message">
              {errors?.first_name &&
                `${errors?.first_name?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div className="secondary-form__input-wrapper--size">
            <label className="secondary-form__label">Phone number:</label>

            <input
              type="text"
              className="secondary-form__input"
              {...register('phone_number', {
                required: InputErrors.REQUIRED,
                pattern: {
                  value: regexpNumbers,
                  message: InputErrors.PATTERN,
                },
              })}
            />

            <div className="secondary-form__message">
              {errors?.phone_number &&
                `${errors?.phone_number?.message || InputErrors.ERROR}`}
            </div>
          </div>
        </div>

        <label className="secondary-form__label">Last name:</label>

        <input
          type="text"
          placeholder="Enter Last name"
          className="secondary-form__input"
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

        <div className="secondary-form__message">
          {errors?.last_name &&
            `${errors?.last_name?.message || InputErrors.ERROR}`}
        </div>

        <label className="secondary-form__label">Nick name:</label>

        <input
          type="text"
          placeholder="Enter Nick name"
          className="secondary-form__input"
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

        <div className="secondary-form__message">
          {errors?.nick_name &&
            `${errors?.nick_name?.message || InputErrors.ERROR}`}
        </div>

        <label className="secondary-form__label">Email:</label>

        <input
          className="secondary-form__input"
          placeholder="Email"
          {...register('email', {
            required: InputErrors.REQUIRED,
            minLength: {
              value: 4,
              message: InputErrors.MIN_LENGTH,
            },
            pattern: {
              value: regexpEmail,
              message: InputErrors.PATTERN,
            },
            maxLength: {
              value: 30,
              message: InputErrors.MAX_LENGTH,
            },
          })}
        />

        <div className="secondary-form__message">
          {errors?.email &&
            `${errors?.email?.message || InputErrors.ERROR}`}
        </div>

        <button
          type="submit"
          className={classNames('secondary-form__button', {
            'disabled-btn': !isValid,
          })}
          disabled={!isValid}
          onClick={handleShowNotification}
        >
          Update settings
        </button>
      </form>
    </section>
  )
}
