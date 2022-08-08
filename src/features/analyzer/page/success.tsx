import { CheckCircleOutlined, FileTextTwoTone, SyncOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Tag } from 'antd';
import React, { FC, memo } from 'react';

import { AnalyzeInitialData } from 'types';
import { useAppSelector } from 'store';

import { selectAnalyzeStatus } from '../redux/selectors';

// import css from './index.module.css';

interface AnalyzisSuccessProps {
  data: AnalyzeInitialData;
}
const AnalyzisSuccess: FC<AnalyzisSuccessProps> = () => {
  const analyzeStatus = useAppSelector(selectAnalyzeStatus);

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
          <Tag
            icon={analyzeStatus === 'processing' ? <SyncOutlined spin /> : <CheckCircleOutlined />}
            color={analyzeStatus || 'default'}
          >
            {analyzeStatus === 'processing' ? 'В обработке' : 'Завершен'}
          </Tag>
        </Descriptions.Item>
        {/* <Descriptions.Item label="Заголовок новости">{data?.title}</Descriptions.Item>
        <Descriptions.Item label="Текст новости">
          <></>
        </Descriptions.Item> */}
      </Descriptions>
      {/* <span className={css.textDescriptionContent}>{data?.text}</span> */}
      <Divider />
    </>
  );
};

export default memo(AnalyzisSuccess);
