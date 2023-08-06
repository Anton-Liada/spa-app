import React from 'react';
import { AddCompanyForm } from '../../componets/addCompanyForm';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <AddCompanyForm />
      </div>
    </div>
  );
};
