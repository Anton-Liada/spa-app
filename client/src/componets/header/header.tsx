import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { logout, selectIsLogin } from '../../features/slices/authSlice';
import { HeaderLink } from '../headerLink';
import './header.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);
  const isAccessTokenExist = Boolean(
    window.localStorage.getItem('access_token'),
  );
  const [isAuth, setIsAuth] = useState(isAccessTokenExist || isLogin);

  useEffect(() => {
    setIsAuth(isAccessTokenExist || isLogin);
  }, [isLogin, isAccessTokenExist]);

  const onClickLogout = () => {
    dispatch(logout());
    setIsAuth(false);
    window.localStorage.removeItem('access_token');
  };

  return (
    <>
      {isAuth && (
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

                  <HeaderLink
                    content="Profile"
                    to="/profile"
                    style="nav__link"
                  />

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
      )}
    </>
  );
};
