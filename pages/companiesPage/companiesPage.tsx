import React, { useEffect } from 'react';
import { CompaniesList } from '/src/componets/companiesList';
import { Loader } from '/src/componets/loader';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { fetchCompanies } from '/src/features/slices/companiesSlice';
import { Status } from '/src/types/enums';

export const CompaniesPage: React.FC = () => {
  const companies = useAppSelector(state => state.companies.companies);
  const fetchRequestStatus = useAppSelector(state => state.companies.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <>
      {fetchRequestStatus === Status.LOADING && <Loader />}

      {fetchRequestStatus === Status.SUCCEEDED && (
        <CompaniesList companies={companies} title="Companies" />
      )}
    </>
  );
};
