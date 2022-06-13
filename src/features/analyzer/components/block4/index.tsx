import { DashboardTwoTone } from '@ant-design/icons';
import { Descriptions, Divider } from 'antd';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';

interface Block4Props {
  data: AnalyzisData;
}

const Block4: FC<Block4Props> = ({ data }: Block4Props) => {
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
        <Descriptions.Item label="Наличие в тексте ссылки на первоисточник">
          {data.grammatic_errors_count}
        </Descriptions.Item>
        <Descriptions.Item label="Количество грамматических ошибок в тексте">
          {data?.grammatic_errors_count || 'н/д'}
        </Descriptions.Item>
        <Descriptions.Item label="Индекс «заспамленности»">{data?.spam_index || 'н/д'}</Descriptions.Item>

        <Descriptions.Item label="Индекс «воды»">{data?.water_index || 'н/д'}</Descriptions.Item>
        <Descriptions.Item label="Индекс кликбейтности">{data?.clickbait_index || 'н/д'}</Descriptions.Item>
        <Descriptions.Item label="Индекс по наличию эмоционально окрашенных слов">
          {data?.sentiment_index || 'н/д'}
        </Descriptions.Item>
        <Descriptions.Item label="Степень похожести стиля статьи на разговорный">
          {data?.speech_index || 'н/д'}
        </Descriptions.Item>
        <Descriptions.Item label="Степень похожести стиля статьи на научный">
          {data?.intuition_index || 'н/д'}
        </Descriptions.Item>
        <Descriptions.Item label="Соотношение слов аппелирующих к разуму / чувствам">
          {data?.rationality_index || 'н/д'}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </>
  );
};

export default memo(Block4);
