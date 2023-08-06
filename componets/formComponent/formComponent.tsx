import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { createNewCompany } from '../../features/slices/companiesSlice';
import { ICompany } from '../../types/types';
import { Notification } from '../notification';
import { EMessages, InputErrors } from '/src/types/enums';
import { regexpAddress, regexpWords } from '/src/utils/regexp';

export const FormComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile.profile);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const message = useAppSelector(state => state.companies.error);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<ICompany>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      serviceOfActivity: '',
      address: '',
      numberOfEmployees: null,
      type: '',
    },
  });

  const onSubmit = async (company: ICompany) => {
    let data;

    if (profile) {
      data = await dispatch(
        createNewCompany({
          ...company,
          userId: profile.id,
        }),
      );
    }

    if (data && 'error' in data) {
      setIsShowNotification(true);
      setIsErrorMessage(true);
    } else {
      setIsErrorMessage(false);
      setIsShowNotification(true);
      reset();
    }
  };

  return (
    <>
      <form className="secondary-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="secondary-form__wrapper">
          <div className="secondary-form__input-wrapper">
            <label className="secondary-form__label">Company Title:</label>

            <input
              type="text"
              placeholder="Enter title"
              className="secondary-form__input"
              {...register('name', {
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
              {errors?.name && `${errors?.name?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div className="secondary-form__input-wrapper--size">
            <label className="secondary-form__label">
              Number of employees:
            </label>

            <input
              type="number"
              className="secondary-form__input"
              {...register('numberOfEmployees', {
                required: InputErrors.REQUIRED,
              })}
            />

            <div className="secondary-form__message">
              {errors?.numberOfEmployees &&
                `${errors?.numberOfEmployees?.message || InputErrors.ERROR}`}
            </div>
          </div>
        </div>

        <label className="secondary-form__label">Company Address:</label>

        <input
          type="text"
          placeholder="Enter address"
          className="secondary-form__input"
          {...register('address', {
            required: InputErrors.REQUIRED,
            minLength: {
              value: 4,
              message: InputErrors.MIN_LENGTH,
            },
            pattern: {
              value: regexpAddress,
              message: InputErrors.PATTERN,
            },
            maxLength: {
              value: 30,
              message: InputErrors.MAX_LENGTH,
            },
          })}
        />

        <div className="secondary-form__message">
          {errors?.address &&
            `${errors?.address?.message || InputErrors.ERROR}`}
        </div>

        <label className="secondary-form__label">Company type:</label>

        <input
          type="text"
          placeholder="Enter type"
          className="secondary-form__input"
          {...register('type', {
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
          {errors?.type && `${errors?.type?.message || InputErrors.ERROR}`}
        </div>

        <label className="secondary-form__label">Service of activity:</label>

        <textarea
          className="secondary-form__input secondary-form__input--size"
          placeholder="What's on your mind?"
          {...register('serviceOfActivity', {
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
          {errors?.serviceOfActivity &&
            `${errors?.serviceOfActivity?.message || InputErrors.ERROR}`}
        </div>

        <button
          type="submit"
          className={classNames('secondary-form__button', {
            'disabled-btn': !isValid,
          })}
          disabled={!isValid}
        >
          Save Company
        </button>
      </form>

      <Notification
        message={message || EMessages.CREATED_COMPANY_MSG}
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
        isErrorMessage={isErrorMessage}
      />
    </>
  );
};
