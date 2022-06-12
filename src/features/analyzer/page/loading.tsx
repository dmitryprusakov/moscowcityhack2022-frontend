import { Badge, Descriptions } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { FC, memo } from 'react';

import { Skeleton } from 'core/components/loader';

const AnalyzisLoading: FC = () => {
  return (
    <Descriptions
      size="default"
      title={
        <>
          <LoadingOutlined /> Результаты парсинга
        </>
      }
      column={1}
    >
      <Descriptions.Item label="Процесс анализа">
        <Badge status="default" text="Загружается" />
      </Descriptions.Item>
      <Descriptions.Item label="Заголовок новости">
        <Skeleton />
      </Descriptions.Item>
      <Descriptions.Item label="Текст новости">
        <Skeleton paragraphRowsCount={7} />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default memo(AnalyzisLoading);
