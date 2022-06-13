import { Descriptions, Divider } from 'antd';
import { ProjectTwoTone } from '@ant-design/icons';
import React, { FC, memo, useEffect } from 'react';

import { createChart } from './utils';

import { AnalyzisData } from 'types';
import css from './index.module.css';

interface ChartProps {
  data: AnalyzisData;
}

const Chart: FC<ChartProps> = ({ data }: ChartProps) => {
  useEffect(() => {
    createChart('chart', data);
  }, [data]);

  return (
    <>
      <Descriptions
        size="default"
        layout="horizontal"
        title={
          <>
            <ProjectTwoTone /> Диаграмма динамики перепечаток
          </>
        }
        column={1}
      />
      <div id="chart" className={css.chart} />
      <Divider />
    </>
  );
};

export default memo(Chart);
