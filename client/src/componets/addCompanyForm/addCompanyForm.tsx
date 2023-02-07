import React, { useState } from 'react';
import { FormComponent } from '../formComponent/formComponent';
import { Notification } from '../notification';
import './addCompanyForm.scss';

export const AddCompanyForm: React.FC = () => {
  const [isShowNotification, setIsShowNotification] = useState(false);

  const handleShowNotification = () => {
    setIsShowNotification(true);
  };

  return (
    <>
      <Notification
        message="Your company has been successfully created."
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
      />
      <section className="add-section">
        <h2 className="title title--size add-section__title">
          Add a New Company
        </h2>

        <FormComponent onClick={handleShowNotification} />
      </section>
    </>
  );
};
