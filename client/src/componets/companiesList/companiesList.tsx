import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { fetchCompanies } from '../../features/slices/companiesSlice';
import { Status } from '../../types/enums';
import CompanyExcerpt from '../companyExcerpt/companyExcerpt';
import { Loader } from '../loader';
import './companiesList.scss';

export const CompaniesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchRequestStatus = useAppSelector(state => state.companies.status);
  const errorMessage = useAppSelector(state => state.companies.error);

  useEffect(() => {
    if (fetchRequestStatus === Status.IDLE) {
      dispatch(fetchCompanies());
    }

  }, [fetchRequestStatus, dispatch]);

  const companies = useAppSelector(state => state.companies.companies);

  const content = companies.map(company => (
    <CompanyExcerpt key={company.id} company={company} />
  ));

  return (
    <>
      {(fetchRequestStatus === Status.LOADING) && (<Loader />)}

      {(fetchRequestStatus === Status.FAILED) && (<p>{errorMessage}</p>)}

      {(fetchRequestStatus === Status.SUCCEEDED) && (
        <section className="companies-section">
          <h2 className="title title--size add-section__title">
            Companies
          </h2>

          {content}
        </section>
      )}
    </>
  )
}
