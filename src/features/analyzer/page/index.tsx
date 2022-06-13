import React, { FC } from 'react';

import { AnalyzeInitialData, AnalyzisData } from 'types';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { Block1, Block2, Block3, Block4, Chart, Controls } from '../components';
import { selectAnalyzisData, selectInitialData } from '../redux/selectors';

import AnalyzisFailure from './failure';
import AnalyzisLoading from './loading';
import AnalyzisSuccess from './success';

import css from './index.module.css';

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => <AnalyzisSuccess data={data} />,
  () => <></>,
  () => <AnalyzisLoading />,
  (error) => <AnalyzisFailure error={error} />
);

const analyzerDataFolder = fold<AnalyzisData>(
  (data) => (
    <>
      <Block1 data={data} />
      <Block2 data={data} />
      <Chart data={data} />
      <Block3 data={data} />
      <Block4 data={data} />
    </>
  ),
  () => <></>,
  () => <>analyzerDataFolder loading</>,
  () => <>analyzerDataFolder error</>
);

const AnalyzerIndex: FC = () => {
  const analisisInitialData = useAppSelector(selectInitialData);

  const analisisData = useAppSelector(selectAnalyzisData);

  return (
    <div className={css.layout}>
      <Controls />
      {analyzerInitialDataFolder(analisisInitialData)}
      {analyzerDataFolder(analisisData)}
    </div>
  );
};

export default AnalyzerIndex;
