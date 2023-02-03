import React, { ReactElement } from 'react';
import styles from './button.module.scss';

interface IProps {
  onClick?: () => void;
  content?: string;
}

export const ButtonComponent: React.FC<IProps> = ({
  onClick,
  content,
}) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={styles.button}
    >
      {content}
    </button>
  );
};
