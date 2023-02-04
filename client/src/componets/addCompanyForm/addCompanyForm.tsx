import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { createNewCompany } from '../../features/slices/companiesSlice';
import { ICompany, IUser } from '../../types/types';
import classNames from 'classnames';
import jwtDecode from 'jwt-decode';
import './addCompanyForm.scss';

export const AddCompanyForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem('access_token') || '';
  const currentUser: IUser = jwtDecode(token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ICompany>({
    defaultValues: {
      name: '',
      serviceOfActivity: '',
      address: '',
      numberOfEmployees: null,
      type: '',
    }
  });

  const onSubmit = async (company: ICompany) => {
    try {
      if (currentUser) {
        await dispatch(createNewCompany({
          ...company,
          userId: currentUser.id,
        }));
        reset();
      }
    } catch (error) {
      throw new Error('something went wrong')
    }
  };

  return (
    <section className="add-section">
      <h2 className="title title--size add-section__title">
        Add a New Company
      </h2>

      <form
        className="secondary-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="secondary-form__wrapper">
          <div className="secondary-form__input-wrapper">
            <label className="secondary-form__label">
              Company Title:s
            </label>

            <input
              type="text"
              placeholder="Enter title"
              className="secondary-form__input"
              {...register('name', { required: 'Enter title' })}
            />
          </div>

          <div className="secondary-form__input-wrapper--size">
            <label className="secondary-form__label">
              Number of employees:
            </label>

            <input
              type="number"
              className="secondary-form__input"
              {...register('numberOfEmployees', { required: 'Enter number of Employees' })}
            />
          </div>
        </div>

        <label className="secondary-form__label">
          Company Address:
        </label>

        <input
          type="text"
          placeholder="Enter address"
          className="secondary-form__input"
          {...register('address', { required: 'Enter address' })}
        />

        <label className="secondary-form__label">
          Company type:
        </label>

        <input
          type="text"
          placeholder="Enter type"
          className="secondary-form__input"
          {...register('address', { required: 'Enter address' })}
        />

        <label className="secondary-form__label">
          Service of activity:
        </label>

        <textarea
          className="secondary-form__input secondary-form__input--size"
          {...register('serviceOfActivity', { required: 'Enter service of activity' })}
          placeholder="What's on your mind?"
        />

        <button
          type="submit"
          className={classNames("secondary-form__button",
            {
              'disabled-btn': !isValid,
            },
          )}
          disabled={!isValid}
        >
          Save Company
        </button>
      </form>
    </section>
  )
}
