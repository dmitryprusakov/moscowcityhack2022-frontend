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
        <Descriptions.Item label="Количество грамматических ошибок в тексте">
          {data?.grammatical_errors_count}
        </Descriptions.Item>
        <Descriptions.Item label="Индекс «заспамленности»">{data?.spam}</Descriptions.Item>

        <Descriptions.Item label="Индекс «воды»">{data?.water}</Descriptions.Item>
        <Descriptions.Item label="Индекс кликбейтности">{data?.clickbait}</Descriptions.Item>
        <Descriptions.Item label="Индекс по наличию эмоционально окрашенных слов">{data?.sentiment}</Descriptions.Item>
        <Descriptions.Item label="Степень похожести стиля статьи на разговорный">{data?.speech}</Descriptions.Item>
        <Descriptions.Item label="Степень похожести стиля статьи на научный">{data?.intuition}</Descriptions.Item>
        <Descriptions.Item label="Соотношение слов аппелирующих к разуму / чувствам">
          {data?.rationality}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </>
  );
};

export default memo(Block4);
