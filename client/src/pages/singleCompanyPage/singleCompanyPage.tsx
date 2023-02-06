import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { deleteCompany, fetchOneCompany } from '../../features/slices/companiesSlice';
import './singleCompanyPage.scss';
import { Modal } from '/src/componets/Modal';
import { ICompany } from '/src/types/types';

export const SingleCompanyPage: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const nav = useNavigate();
  const { id = null } = useParams();
  const dispatch = useAppDispatch();
  const company = useAppSelector((state) =>
    state.companies.selectedCompany);
  const profile = useAppSelector(state => state.profile.profile);

  useEffect(() => {
    dispatch(fetchOneCompany(Number(id)));
  }, [dispatch]);

  const handleDeleteCompany = () => {
    try {
      dispatch(deleteCompany(Number(id)));
    } catch (error) {
      throw new Error('somethig went wrong');
    }

    nav('/');
  };

  const isMyCompany = profile?.id === company?.userId;

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  return (
    <>
      {isOpenModal && <Modal setIsOpenModal={setIsOpenModal} />}

      <section className="company-section container-small">
        <div className="card company-section__card">
          <h3 className="card__title card__title--size">
            {company?.name}
          </h3>

          <p className="card__description">
            {company?.serviceOfActivity}
          </p>

          <p>
            <span className="card__span">Address:</span>
            {` ${company?.address}`}
          </p>
            
          <p>
            <span className="card__span">Type:</span>
            {` ${company?.type}`}
          </p>

          <p>
            <span className="card__span">Number of Employees:</span>
            {` ${company?.numberOfEmployees}`}
          </p>

          {isMyCompany &&
            <div className="card__buttons-wrapper">
              <button className="card__button" onClick={handleOpenModal}>
                update
              </button>

              <button className="card__button" onClick={handleDeleteCompany}>
                delete
              </button>
            </div>
          }
        </div>

        <Link to={`/companies`} className="card__link">
          Back to Companies page
        </Link>
      </section>
    </>
  )
}
