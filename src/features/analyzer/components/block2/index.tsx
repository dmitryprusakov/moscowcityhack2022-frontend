import { Descriptions, Divider } from 'antd';
import { PrinterTwoTone } from '@ant-design/icons';
import React, { FC, memo } from 'react';

import { AnalyzisData } from 'types';

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
            <PrinterTwoTone /> Анализ перепечаток
          </>
        }
        column={1}
      >
        <Descriptions.Item label="Количество СМИ, разместивших статью или её видоизменённые копии">
          {data.times_published}
        </Descriptions.Item>
        <Descriptions.Item label="% СМИ из списка, заблокированных Роскомнадзором">
          {data?.percentage_blacklist}
        </Descriptions.Item>

        <Descriptions.Item label="Средний рейтинг СМИ , разместивших перепечатку статьи">
          {data?.avg_sources_score}
        </Descriptions.Item>
        <Descriptions.Item label="Наличие более 10 доверенных источников">
          {data?.reliable_sources_flag}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </>
  );
};

export default memo(Block2);
