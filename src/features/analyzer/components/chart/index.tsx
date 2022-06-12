import React, { FC, memo, useEffect } from 'react';

import { createChart } from './utils';

import css from './index.module.css';

const Chart: FC = () => {
  useEffect(() => {
    createChart('chart');
  }, []);

  return <div id="chart" className={css.chart} />;
};

export default memo(Chart);
