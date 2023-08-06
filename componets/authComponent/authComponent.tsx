import React from 'react';
import { Link } from 'react-router-dom';
import './authComponent.scss';

interface IProps {
  to: string;
  title: string;
  content: string;
}

export const AuthComponent: React.FC<IProps> = ({ to, title, content }) => {
  return (
    <>
      <h2 className="auth__title title">{title}</h2>

      <p className="auth__description">
        If you don’t have an account register <br />
        You can
        <Link to={`/${to}`} className="auth__link">
          {content}
        </Link>
      </p>
    </>
  );
};
