import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { ICompany } from '/src/types/types';
import classNames from 'classnames';
import { updateCompany } from '/src/features/slices/companiesSlice';
import './modal.scss';

interface IModal {
  setIsOpenModal: (value: boolean) => void;
  onClick: () => void;
}

export const Modal: React.FC<IModal> = ({ setIsOpenModal, onClick }) => {
  const dispatch = useAppDispatch();
  const company = useAppSelector(state => state.companies.selectedCompany);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ICompany>({
    defaultValues: {
      id: company?.id,
      name: company?.name || '',
      serviceOfActivity: company?.serviceOfActivity || '',
      address: company?.address || '',
      numberOfEmployees: company?.numberOfEmployees || null,
      type: company?.type || '',
    }
  });

  const onSubmit = async (company: ICompany) => {
    await dispatch(updateCompany(company));

    setIsOpenModal(false);
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title has-text-weight-medium">
            Update company
          </div>

          <button className="secondary-form__button secondary-form__button--close"
            onClick={handleCloseModal}
          >
            &#9587;
          </button>
        </header>

        <form
          className="secondary-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="secondary-form__wrapper">
            <div className="secondary-form__input-wrapper">
              <label className="secondary-form__label">
                Company Title:
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
            {...register('type', { required: 'Enter type' })}
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
            onClick={onClick}
            disabled={!isValid}
          >
            Save Company
          </button>
        </form>
      </div>
    </div>
  );
};
