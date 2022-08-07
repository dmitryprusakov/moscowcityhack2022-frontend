import { Link } from 'react-router-dom';
import React, { FC } from 'react';

import css from './index.module.css';

const Header: FC = () => {
  return (
    <div className={css.layout}>
      <Link to="/">
        <h1>Ezee News Analyzer для MoscowCityHack2022</h1>
      </Link>
      <Link to="/about">
        <h2>Документация</h2>
      </Link>
    </div>
  );
};

export default Header;
