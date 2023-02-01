import React, { useEffect, useState } from 'react'
import { fetchCompanies } from '../../features/slices/companiesSlice';
import { Loader } from '../../componets/loader';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { Status } from '../../types/enums';
import ReactPaginate from 'react-paginate';
import { ISelectedPage } from '../../types/types';
import { CompanyExcerpt } from '../../componets/companyExcerpt';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(state => state.companies.companies);
  const fetchRequestStatus = useAppSelector(state => state.companies.status);
  const errorMessage = useAppSelector(state => state.companies.error);

  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  // const [value, setValue] = useState('');

  useEffect(() => {
    if (fetchRequestStatus === Status.IDLE) {
      dispatch(fetchCompanies());
    }
  }, []);

  const offset = currentPage * itemsPerPage;

  let content;

  if (fetchRequestStatus === Status.SUCCEEDED) {
    const companiesPerPage = companies.slice(offset, offset + itemsPerPage);

    content = companiesPerPage.map(company => (
      <CompanyExcerpt
        key={company.id}
        company={company}
      // isOpenModal={isOpenModal} 
      />
    ));
  }

  const handlePageChange = ({ selected: selectedPage }: ISelectedPage) => {
    setCurrentPage(selectedPage);
  };

  // const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };

  const pageCount = Math.ceil(companies.length / itemsPerPage);

  return (
    <>
    <button>
      your profile
    </button>

    <button>
      logout
    </button>
      {/* <label className="filter-label">Find user by last name</label>

      <input
        className="filter-input"
        placeholder="Last name"
        type="text"
        value={value}
        onChange={onChangeInput}
      /> */}

      {fetchRequestStatus === Status.LOADING && <Loader />}

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {fetchRequestStatus === Status.SUCCEEDED && (
        <>
          <table className="content-table">
            <thead>
              <tr>
                <th className="content-table__th">ID</th>
                <th className="content-table__th">Name</th>
                <th className="content-table__th">Address</th>
                <th className="content-table__th">Service of activity</th>
                <th className="content-table__th">Number of employees</th>
                <th className="content-table__th">Actions</th>
              </tr>
            </thead>

            <tbody>{content}</tbody>
          </table>

          {itemsPerPage > 10 &&
            <ReactPaginate
              previousLabel="prev"
              nextLabel="next"
              pageCount={pageCount}
              onPageChange={handlePageChange}
              marginPagesDisplayed={3}
              containerClassName="pagination-list"
              previousLinkClassName="pagination-previous"
              pageLinkClassName="pagination-link"
              nextLinkClassName="pagination-next"
              disabledClassName="pagination__link--disabled"
              activeClassName="pagination__link-active"
            />
          }
        </>
      )}
    </>
  );
}
