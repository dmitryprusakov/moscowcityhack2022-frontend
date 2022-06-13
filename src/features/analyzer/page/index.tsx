import { Descriptions, Divider } from 'antd';
import { ReconciliationTwoTone } from '@ant-design/icons';
import React, { FC } from 'react';

import { AnalyzeInitialData, AnalyzisData } from 'types';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { selectAnalyzisData, selectInitialData } from '../redux/selectors';
import css from './index.module.css';

import { Block1, Block2, Block3, Block4, Chart, Controls } from '../components';
import AnalyzisFailure from './failure';
import AnalyzisLoading from './loading';
import AnalyzisSuccess from './success';

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => <AnalyzisSuccess data={data} />,
  () => <></>,
  () => <AnalyzisLoading />,
  (error) => <AnalyzisFailure error={error} />
);

const analyzerDataFolder = fold<AnalyzisData>(
  (data) => (
    <>
      {/* <Divider /> */}
      <Block1 data={data} />
      <Block2 data={data} />
      <Chart data={data} />
      <Block3 data={data} />
      <Block4 data={data} />
    </>
  ),
  () => <></>,
  () => <>block1 loading</>,
  () => <>block1 error</>
);

const AnalyzerIndex: FC = () => {
  const analisisInitialData = useAppSelector(selectInitialData);

  const analisisData = useAppSelector(selectAnalyzisData);

  // const analisisDataBlock1 = useAppSelector(selectAnalyzisDataBlock1);
  // const analisisDataBlock2 = useAppSelector(selectAnalyzisDataBlock2);

  return (
    <div className={css.layout}>
      <Controls />
      {analyzerInitialDataFolder(analisisInitialData)}
      {analyzerDataFolder(analisisData)}
      {/* {analyzerDataBlock1Folder(analisisDataBlock1)} */}
    </div>
  );
};

export default AnalyzerIndex;
