import React, { FC } from 'react';

import { Header, Main } from './layouts';

import 'react-loading-skeleton/dist/skeleton.css';

import 'antd/dist/antd.less';

import css from './index.module.css';

const Core: FC = () => {
  return (
    <section className={css.layout}>
      <header className={css.header}>
        <Header />
      </header>
      <main className={css.main}>
        <Main />
      </main>
    </section>
  );
};

export default Core;
