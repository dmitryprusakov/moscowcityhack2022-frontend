import { Badge, Descriptions, Divider } from 'antd';
import { PrinterTwoTone } from '@ant-design/icons';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';
import { selectAnalyzeStatus } from 'features/analyzer/redux/selectors';
import { useAppSelector } from 'store';

import css from './index.module.css';

interface Block2Props {
  data: AnalyzisData;
}

const Block2: FC<Block2Props> = ({ data }: Block2Props) => {
  const analyzeStatus = useAppSelector(selectAnalyzeStatus);

  const isLoading = analyzeStatus === 'processing';
  return (
    <>
      <Descriptions
        size="default"
        layout="horizontal"
        title={
          <>
            <PrinterTwoTone /> Анализ перепечаток
          </>
        }
        column={1}
      >
        {/* <Descriptions.Item label="Количество СМИ, разместивших статью или её видоизменённые копии">
          {data.times_published}
        </Descriptions.Item> */}
        <Descriptions.Item label="% СМИ из списка, заблокированных Роскомнадзором">
          {data?.percentage_blacklist || !isLoading ? (
            data?.percentage_blacklist
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Средний рейтинг СМИ , разместивших перепечатку статьи">
          {data?.avg_sources_score || !isLoading ? (
            data?.avg_sources_score
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Наличие более 10 доверенных источников">
        {data?.reliable_sources}
        </Descriptions.Item> */}
      </Descriptions>
      <Divider />
    </>
  );
};

export default memo(Block2);
