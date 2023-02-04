import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ICompany } from '../../types/types';
import '../../styles/main.scss';

interface IProps {
  company: ICompany;
}

let CompanyExcerpt: React.FC<IProps> = ({ company }) => {
  const {
    id,
    name,
    serviceOfActivity,
  } = company;

  return (
    <div className="card companies-section__card">
      <h4 className="card__title">
        {name}
      </h4>

      <p className="card__description">
        {serviceOfActivity}
      </p>

      <Link
        to={`/companies/${id}`}
        className="card__link"
      >
        View company
      </Link>
    </div>
  );
};

export default CompanyExcerpt = memo(CompanyExcerpt);
