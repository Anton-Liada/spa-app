import React, { useState } from 'react';
import { FormComponent } from '../formComponent/formComponent';
import { Notification } from '../notification';
import './addCompanyForm.scss';
import { EMessages } from '/src/types/enums';

export const AddCompanyForm: React.FC = () => {
  const [isShowNotification, setIsShowNotification] = useState(false);

  return (
    <>
      <Notification
        message={EMessages.CREATED_COMPANY_MSG}
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
      />

      <section className="add-section">
        <h2 className="title title--size add-section__title">
          Add a New Company
        </h2>

        <FormComponent />
      </section>
    </>
  );
};
