import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main.scss';
import { ICompany } from '../../types/types';

interface IProps {
  company: ICompany;
}

let CompanyExcerpt: React.FC<IProps> = ({ company }) => {
  const { id, name, serviceOfActivity, address } = company;

  return (
    <div className="card companies-section__card">
      <div className="card__header">
        <h4 className="card__title">{name}</h4>
        <p>{`Address: ${address}`}</p>
      </div>

      <p className="card__description">
        <strong>Service of ativity</strong>

        <br />

        {serviceOfActivity}
      </p>

      <Link to={`/companies/${id}`} className="card__link">
        View company
      </Link>
    </div>
  );
};

export default CompanyExcerpt = memo(CompanyExcerpt);
