import React, { useCallback, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../../features/hooks/hooks';
import { Status } from '../../types/enums';
import { ICompany } from '../../types/types';
import CompanyExcerpt from '../companyExcerpt/companyExcerpt';
import { Filter } from '../filter';
import './companiesList.scss';
import { filteredCompaniesByKeyWords } from '/src/utils/filteredCompaniesByKeyWords';

interface ICompaniesList {
  companies?: ICompany[];
  title: string;
}

interface IOnPageChange {
  selected: number;
}

export const CompaniesList: React.FC<ICompaniesList> = ({
  companies,
  title,
}) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [value, setValue] = useState('');
  const fetchRequestStatus = useAppSelector(state => state.companies.status);

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value.trimStart());
    },
    [value],
  );

  if (!companies?.length) {
    return (
      <h2 className="title title--position">No companies are here... yet.</h2>
    );
  }

  const offset = currentPage * itemsPerPage;

  let filteredCompanies: ICompany[];

  value
    ? (filteredCompanies = filteredCompaniesByKeyWords(companies, value))
    : (filteredCompanies = companies);

  let content;

  if (fetchRequestStatus === Status.SUCCEEDED) {
    const companiesPerPage = filteredCompanies.slice(
      offset,
      offset + itemsPerPage,
    );

    content = companiesPerPage.map(company => (
      <CompanyExcerpt key={company.id} company={company} />
    ));
  }

  const handlePageClicked = ({ selected: selectedPage }: IOnPageChange) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(filteredCompanies.length / itemsPerPage);

  return (
    <section className="companies-section container">
      <h2 className="title title--size add-section__title">{title}</h2>

      <Filter
        amountOfCompanies={filteredCompanies.length}
        onChange={onChangeInput}
        value={value}
      />

      <div className="card-list">{content}</div>

      {filteredCompanies.length > itemsPerPage && (
        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          pageCount={pageCount}
          onPageChange={handlePageClicked}
          marginPagesDisplayed={3}
          containerClassName="pagination-list"
          previousLinkClassName="pagination-previous"
          pageLinkClassName="pagination-link"
          nextLinkClassName="pagination-next"
          disabledClassName="pagination__link--disabled"
          activeClassName="pagination__link-active"
        />
      )}
    </section>
  );
};
