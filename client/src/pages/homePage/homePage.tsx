import React, { useEffect } from 'react';
import { AddCompanyForm } from '../../componets/addCompanyForm';
import { CompaniesList } from '../../componets/companiesList';
import { useAppDispatch } from '../../features/hooks/hooks';
import { fetchUsers } from '../../features/slices/usersSlice';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section className="container-small">
      <AddCompanyForm />
      <CompaniesList />
    </section>
  );
}
