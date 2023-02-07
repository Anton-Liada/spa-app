import React from 'react';
import './filter.scss';

interface IFilterProps {
  amountOfCompanies: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filter: React.FC<IFilterProps> = ({
  onChange,
  amountOfCompanies,
  value,
}) => {
  return (
    <div className="filter home-page__filter">
      <label className="filter__label">
        Filter title by keywords
      </label>

      <input
        className="filter__input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />

      <p className="filter__results">{`Results: ${amountOfCompanies}`}</p>
    </div>
  );
};
