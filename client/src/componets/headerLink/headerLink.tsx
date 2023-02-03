import React from 'react';
import { NavLink } from 'react-router-dom';

interface IPorps {
  content: string;
  style: string;
  to: string;
  onClick?: () => void;
}

export const HeaderLink: React.FC<IPorps> = ({ content, style, to, onClick }) => {
  return (
    <NavLink
      className={style}
      to={to}
      onClick={onClick}
    >
      {content}
    </NavLink>
  )
}
