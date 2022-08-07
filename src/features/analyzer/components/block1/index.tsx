import { CopyrightTwoTone } from '@ant-design/icons';
import { Descriptions, Divider } from 'antd';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';

import css from './index.module.css';

interface Block1Props {
  data: AnalyzisData;
}

const Block1: FC<Block1Props> = ({ data }: Block1Props) => {
  return (
    <>
      <Descriptions
        size="default"
        layout="horizontal"
        title={
          <>
            <CopyrightTwoTone /> Оригинал статьи
          </>
        }
        column={1}
      >
        <Descriptions.Item label="Индекс достоверности">{data?.fake}</Descriptions.Item>
        <Descriptions.Item label="Ссылка на источник">{data?.primary_source_url}</Descriptions.Item>
        <Descriptions.Item label="Рейтинг достоверности первоисточника">{data?.source_score}</Descriptions.Item>
        <Descriptions.Item label="Дата публикации">{data?.created_at}</Descriptions.Item>
        <Descriptions.Item label="Текст источника">
          <></>
        </Descriptions.Item>
      </Descriptions>
      <span className={css.textDescriptionContent}>{data?.text}</span>
      <Divider />
    </>
  );
};

export default memo(Block1);
