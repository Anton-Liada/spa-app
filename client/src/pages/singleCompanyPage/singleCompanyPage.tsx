import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { deleteCompany, fetchOneCompany } from '../../features/slices/companiesSlice';
import './singleCompanyPage.scss';
import { Status } from '/src/types/enums';

export const SingleCompanyPage: React.FC = () => {
  const nav = useNavigate();
  const { id = null } = useParams();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(state => state.auth.email);
  const currentUser = useAppSelector(state => state.users.users.find(user => user.email === userEmail));

  useEffect(() => {
    dispatch(fetchOneCompany(Number(id)));

  }, [dispatch]);

  const company = useAppSelector(state => state.companies.selectedCompany);

  if (!company) {
    return (
      <section className="company-section">
        <h3 className="title">Company not found!</h3>
      </section>
    )
  }

  const isMyCompany = company.userId === currentUser?.id;

  const {
    name,
    serviceOfActivity,
    numberOfEmployees,
    type,
    address } = company;

  const handleDeleteCompany = () => {
    try {
      dispatch(deleteCompany(Number(id)));
    } catch (error) {
      throw new Error('somethig went wrong');
    }

    nav('/');
  };

  return (
    <section className="company-section container-small">
      <div className="card company-section__card">
        <h3 className="card__title card__title--size">
          {name}
        </h3>

        <p className="card__description">
          {serviceOfActivity}
        </p>

        <p className="card__description">
          {`Type:  ${type}`}
        </p>

        <p className="card__description">
          {`Number of employess:  ${numberOfEmployees}`}
        </p>

        <p className="card__description">
          {`Address:  ${address}`}
        </p>

        {isMyCompany &&
          <div className="card__buttons-wrapper">
            <button className="card__button">
              update
            </button>

            <button className="card__button" onClick={handleDeleteCompany}>
              delete
            </button>
          </div>
        }
      </div>

      <Link to={`/`} className="card__link">
        Back to Home page
      </Link>
    </section>
  )
}
