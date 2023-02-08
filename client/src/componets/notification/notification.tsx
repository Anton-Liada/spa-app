import classNames from 'classnames';
import React, { useEffect } from 'react';
import { EMessages } from '/src/types/enums';
import './notification.scss';

interface INotification {
  message: EMessages | null;
  isShowNotification: boolean;
  setIsShowNotification: (value: boolean) => void;
  isErrorMessage?: boolean;
}

export const Notification: React.FC<INotification> = ({
  message,
  isShowNotification,
  setIsShowNotification,
  isErrorMessage,
}) => {
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
  };

  const cls = isErrorMessage ? 'is-danger' : 'is-success';

  return (
    <div
      hidden={!isShowNotification}
      className={classNames(`notification is-light ${cls}`)}
    >
      <button
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={handleHideNotification}
      />
      {message}
    </div>
  );
};
