import { CopyTwoTone } from '@ant-design/icons';
import { Descriptions, Divider } from 'antd';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';

import css from './index.module.css';

interface Block2Props {
  data: AnalyzisData;
}

const Block2: FC<Block2Props> = ({ data }: Block2Props) => {
  return (
    <>
      <Descriptions
        size="default"
        layout="horizontal"
        title={
          <>
            <CopyTwoTone /> Сравнение с оригиналом
          </>
        }
        column={1}
      >
        <Descriptions.Item label="% уникальности относительно первоисточника">{data?.plagiarism}</Descriptions.Item>

        {/* <Descriptions.Item label="Степень эмоциональности отличается от оригинала">
          {data?.is_any_sentiment_delta}
        </Descriptions.Item>
        <Descriptions.Item label="Сопоставление фактов">
          <></>
        </Descriptions.Item> */}
      </Descriptions>
      {/* <span className={css.textDescriptionContent} style={{ whiteSpace: 'pre-line' }}>
        {data?.facts}
      </span> */}
      <Divider />
    </>
  );
};

export default memo(Block2);
