import { Badge, Descriptions, Divider, Typography } from 'antd';
import { CopyrightTwoTone } from '@ant-design/icons';
import { selectAnalyzeStatus } from 'features/analyzer/redux/selectors';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';
import { useAppSelector } from 'store';

import css from './index.module.css';

const { Link } = Typography;

interface Block1Props {
  data: AnalyzisData;
}

const Block1: FC<Block1Props> = ({ data }: Block1Props) => {
  const analyzeStatus = useAppSelector(selectAnalyzeStatus);

  const isLoading = analyzeStatus === 'processing';

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
        <Descriptions.Item label="Индекс достоверности">
          {data?.fake || !isLoading ? data?.fake : <Badge className={css.badge} text="." status="processing" />}
        </Descriptions.Item>
        <Descriptions.Item label="Ссылка на источник">
          {data?.primary_source_url || !isLoading ? (
            data?.primary_source_url && (
              <Link target="_blank" rel="noopener noreferrer" href={data?.primary_source_url}>
                {data?.primary_source_url}
              </Link>
            )
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Рейтинг достоверности первоисточника">
          {data?.source_score || !isLoading ? (
            data?.source_score
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Дата публикации">
          {data?.created_at || !isLoading ? (
            data?.created_at
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Заголовок источника">
          {data?.source_title || !isLoading ? (
            <h4>{data?.source_title}</h4>
          ) : (
            <Badge className={css.badge} text="." status="processing" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Текст источника">
          <></>
        </Descriptions.Item>
      </Descriptions>
      <span className={css.textDescriptionContent}>{data?.source_text}</span>
      <Divider />
    </>
  );
};

export default memo(Block1);
