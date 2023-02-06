import React from 'react';
import { FormComponent } from '../formComponent/formComponent';
import './addCompanyForm.scss';

export const AddCompanyForm: React.FC = () => {

  return (
    <section className="add-section">
      <h2 className="title title--size add-section__title">
        Add a New Company
      </h2>

      <FormComponent />
    </section>
  )
}
