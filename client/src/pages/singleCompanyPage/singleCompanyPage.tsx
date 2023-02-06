import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { deleteCompany, fetchOneCompany } from '../../features/slices/companiesSlice';
import { Modal } from '../../componets/modal';
import { Notification } from '/src/componets/notification';
import './singleCompanyPage.scss';

export const SingleCompanyPage: React.FC = () => {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const nav = useNavigate();
  const { id = null } = useParams();
  const dispatch = useAppDispatch();
  const company = useAppSelector((state) => state.companies.selectedCompany);
  const profile = useAppSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchOneCompany(Number(id)));
  }, [dispatch]);

  const handleDeleteCompany = () => {
    try {
      dispatch(deleteCompany(Number(id)));
    } catch (error) {
      throw new Error('somethig went wrong');
    }

    nav('/profile');
  };

  if (!company) {
    return <h3 className="title title--position">Company not found</h3>
  }

  const isMyCompany = profile?.id === company?.userId;

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  const handleShowNotification = () => {
    setIsShowNotification(true);
  };

  return (
    <div className="update-page">

      <Notification
       message='updated'
       isShowNotification={isShowNotification}
       setIsShowNotification={setIsShowNotification}
      />

      {isOpenModal && (
      <Modal 
        setIsOpenModal={setIsOpenModal} 
        onClick={handleShowNotification}
      />)}

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
    </div>
  )
}
