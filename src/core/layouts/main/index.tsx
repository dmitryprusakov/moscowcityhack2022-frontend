import { Link, Outlet, Route, Routes } from 'react-router-dom';
import React, { FC, Suspense, memo } from 'react';

import { Analyzer } from 'features';

import { Result } from 'antd';
import css from './index.module.css';

const Main: FC = () => {
  return (
    <div className={css.scroller}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Analyzer />} />
            <Route path="/about" element={'about'} />

            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<Link to="/">Back to main page</Link>}
                />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default memo(Main);
