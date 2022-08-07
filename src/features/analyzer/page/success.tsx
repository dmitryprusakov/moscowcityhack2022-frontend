import { Badge, Descriptions, Divider } from 'antd';
import { FileTextTwoTone } from '@ant-design/icons';
import React, { FC, memo } from 'react';

import { AnalyzeInitialData } from 'types';

import css from './index.module.css';

interface AnalyzisSuccessProps {
  data: AnalyzeInitialData;
}
const AnalyzisSuccess: FC<AnalyzisSuccessProps> = ({ data }: AnalyzisSuccessProps) => {
  return (
    <>
      <Descriptions
        size="default"
        layout="horizontal"
        title={
          <>
            <FileTextTwoTone /> Результаты парсинга
          </>
        }
        column={1}
      >
        <Descriptions.Item label="Процесс анализа">
          <Badge status="processing" text="В обработке" />
        </Descriptions.Item>
        <Descriptions.Item label="Заголовок новости">{data?.title}</Descriptions.Item>
        <Descriptions.Item label="Текст новости">
          <></>
        </Descriptions.Item>
      </Descriptions>
      <span className={css.textDescriptionContent}>{data?.text}</span>
      <Divider />
    </>
  );
};

export default memo(AnalyzisSuccess);
