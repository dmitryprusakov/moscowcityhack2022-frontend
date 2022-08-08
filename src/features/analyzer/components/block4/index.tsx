import { Badge, Descriptions, Divider } from 'antd';
import { DashboardTwoTone } from '@ant-design/icons';
import { selectAnalyzeStatus } from 'features/analyzer/redux/selectors';
import { useAppSelector } from 'store';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';

import css from './index.module.css';

interface Block4Props {
  data: AnalyzisData;
}

const Block4: FC<Block4Props> = ({ data }: Block4Props) => {
  const analyzeStatus = useAppSelector(selectAnalyzeStatus);

  const isLoading = analyzeStatus === 'processing';

  return (
    <>
      <Descriptions
        size="default"
        layout="horizontal"
        title={
          <>
            <DashboardTwoTone /> Анализ текста на формальные признаки фейка
          </>
        }
        column={1}
      >
        <Descriptions.Item label="Количество грамматических ошибок в тексте">
          {data?.grammatical_errors_count || !isLoading ? (
            data?.grammatical_errors_count
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Индекс «заспамленности»">
          {data?.spam || !isLoading ? data?.spam : <Badge className={css.badge} text="." status="processing" />}
        </Descriptions.Item>

        <Descriptions.Item label="Индекс «воды»">
          {data?.water || !isLoading ? data?.water : <Badge className={css.badge} text="." status="processing" />}
        </Descriptions.Item>

        <Descriptions.Item label="Индекс кликбейтности">
          {data?.clickbait || !isLoading ? (
            data?.clickbait
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Индекс по наличию эмоционально окрашенных слов">
          {data?.sentiment || !isLoading ? (
            data?.sentiment
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Степень похожести стиля статьи на разговорный">
          {data?.speech || !isLoading ? data?.speech : <Badge className={css.badge} text="." status="processing" />}
        </Descriptions.Item>

        <Descriptions.Item label="Степень похожести стиля статьи на научный">
          {data?.intuition || !isLoading ? (
            data?.intuition
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Соотношение слов аппелирующих к разуму / чувствам">
          {data?.rationality || !isLoading ? (
            data?.rationality
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </>
  );
};

export default memo(Block4);
