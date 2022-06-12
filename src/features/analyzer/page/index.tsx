import { Descriptions, Divider } from 'antd';
import { ReconciliationTwoTone } from '@ant-design/icons';
import React, { FC } from 'react';

import { AnalyzeInitialData, Block1, Block2 } from 'types';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { selectAnalyzisDataBlock1, selectAnalyzisDataBlock2, selectInitialData } from '../redux/selectors';
import css from './index.module.css';

import { Chart, Controls } from '../components';
import AnalyzisFailure from './failure';
import AnalyzisLoading from './loading';
import AnalyzisSuccess from './success';

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => <AnalyzisSuccess data={data} />,
  () => <></>,
  () => <AnalyzisLoading />,
  (error) => <AnalyzisFailure error={error} />
);

const analyzerDataBlock1Folder = fold<Block1>(
  () => (
    <>
      {/* <Divider /> */}
      <Descriptions
        title={
          <>
            <ReconciliationTwoTone /> Результаты анализа
          </>
        }
      />
    </>
  ),
  () => <></>,
  () => <>block1 loading</>,
  () => <>block1 error</>
);

const analyzerDataBlock2Folder = fold<Block2>(
  () => (
    <>
      {/* <Divider /> */}
      <Chart />
    </>
  ),
  () => <></>,
  () => <>block2 loading</>,
  () => <>block2 error</>
);

const AnalyzerIndex: FC = () => {
  const analisisInitialData = useAppSelector(selectInitialData);
  const analisisDataBlock1 = useAppSelector(selectAnalyzisDataBlock1);
  const analisisDataBlock2 = useAppSelector(selectAnalyzisDataBlock2);

  return (
    <div className={css.layout}>
      <Controls />
      {analyzerInitialDataFolder(analisisInitialData)}
      {analyzerDataBlock2Folder(analisisDataBlock2)}
      {analyzerDataBlock1Folder(analisisDataBlock1)}
    </div>
  );
};

export default AnalyzerIndex;
