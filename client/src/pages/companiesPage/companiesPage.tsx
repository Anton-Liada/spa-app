import React from 'react'
import { CompaniesList } from '/src/componets/companiesList'
import { useAppSelector } from '/src/features/hooks/hooks';

export const CompaniesPage: React.FC = () => {
  const companies = useAppSelector(state => state.companies.companies);

  return (
    <CompaniesList companies={companies} title='Companies'/>
  )
}
