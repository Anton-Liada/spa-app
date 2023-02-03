import React, { useEffect, useState } from 'react'
import { fetchCompanies } from '../../features/slices/companiesSlice';
import { Loader } from '../../componets/loader';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { Status } from '../../types/enums';
import ReactPaginate from 'react-paginate';
import { ICompany, ISelectedPage } from '../../types/types';
import { CompanyExcerpt } from '../../componets/companyExcerpt';
import styles from './homePage.module.scss';
import { ButtonComponent } from '/src/componets/button';

export const HomePage: React.FC = () => {

  const [currentCompany, setCurrentCompany] = useState<ICompany | null>();

  const dispatch = useAppDispatch();
  const companies = useAppSelector(state => state.companies.companies);
  const fetchRequestStatus = useAppSelector(state => state.companies.status);
  const errorMessage = useAppSelector(state => state.companies.error);

  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

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
      />
    ));
  }

  const handlePageChange = ({ selected: selectedPage }: ISelectedPage) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(companies.length / itemsPerPage);

  return (
    <section className={styles.companiesSection}>
      {fetchRequestStatus === Status.LOADING && <Loader />}

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {
        fetchRequestStatus === Status.SUCCEEDED && (
          <>
            <ButtonComponent
              content="add company"
            />

            <table className={styles.contentTable}>
              <thead>
                <tr>
                  <th className={styles.contentTableTh}>ID</th>
                  <th className={styles.contentTableTh}>Name</th>
                  <th className={styles.contentTableTh}>Address</th>
                  <th className={styles.contentTableTh}>Service of activity</th>
                  <th className={styles.contentTableTh}>Number of employees</th>
                  <th className={styles.contentTableTh}>Actions</th>
                </tr>
              </thead>

              <tbody>{content}</tbody>
            </table>

            {companies.length > 10 &&
              <ReactPaginate
                previousLabel="prev"
                nextLabel="next"
                pageCount={pageCount}
                onPageChange={handlePageChange}
                marginPagesDisplayed={3}
                containerClassName={styles.paginationList}
                previousLinkClassName="pagination-previous"
                pageLinkClassName={styles.paginationLink}
                nextLinkClassName="pagination-next"
                disabledClassName="pagination__link--disabled"
                activeClassName="pagination__link-active"
              />
            }
          </>
        )
      }
    </section>
  );
}
