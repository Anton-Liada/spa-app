import React from 'react';
import { useAppDispatch } from '../../features/hooks/hooks';
import { logout } from '../../features/slices/authSlice';
import { HeaderLink } from '../headerLink';
import './header.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('access_token');
  };

  return (
    <header className="header">
      <nav className="nav">
        <div>
          <h1 className="nav__title">Create your own company</h1>

          <div className="nav__content">
            <div className="nav__list">
              <HeaderLink content="Home" to="/" style="nav__link" />

              <HeaderLink
                content="Companies"
                to="/companies"
                style="nav__link"
              />

              <HeaderLink content="Profile" to="/profile" style="nav__link" />

              <HeaderLink
                content="Logout"
                to="/login"
                style="nav__link"
                onClick={onClickLogout}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
