import React, { useCallback, useState } from 'react';
import CompanyExcerpt from '../companyExcerpt/companyExcerpt';
import { Filter } from '../filter';
import { ICompany } from '/src/types/types';
import { filteredCompaniesByTitle } from '/src/utils/utils';
import './companiesList.scss';

interface ICompaniesList {
  companies?: ICompany[];
  title: string;
}

export const CompaniesList: React.FC<ICompaniesList> = ({ companies, title }) => {
  const [value, setValue] = useState('');

  if (!companies) {
    return (
      <h2 className="title title--position">
        No companies are here... yet.
      </h2>
    )
  }

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value.trimStart());
    }, []);

  let filteredCompanies: ICompany[];

  (value)
    ? (filteredCompanies = filteredCompaniesByTitle(companies, value))
    : (filteredCompanies = companies);

  const content = filteredCompanies.map(company => (
    <CompanyExcerpt key={company.id} company={company} />
  ));

  return (
    <section className="companies-section container">
      <h2 className="title title--size add-section__title">
        {title}
      </h2>

      <Filter
        amountOfCompanies={filteredCompanies.length}
        onChange={onChangeInput}
        value={value}
      />

      <div className="card-list">
        {content}
      </div>
    </section>
  )
}
