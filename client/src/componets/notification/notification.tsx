import React, { useEffect } from 'react';
import './notification.scss';

interface INotification {
  message?: string | null,
  isShowNotification: boolean,
  setIsShowNotification: (value: boolean) => void,
}

export const Notification: React.FC<INotification> = ({ message, isShowNotification, setIsShowNotification }) => {

  useEffect(() => {
    const hideMessage = setTimeout(() => {
      setIsShowNotification(false);
    }, 5000);

    return () => {
      clearInterval(hideMessage);
    };
  }, [isShowNotification]);

  const handleHideNotification = () => {
    setIsShowNotification(false);
  }

  return (
    <div
      hidden={!isShowNotification}
      className={'notification is-success is-light'}
    >
      <button
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={handleHideNotification}
      />

      {`Your company has been successfully ${message}.`}
    </div>
  );
};
