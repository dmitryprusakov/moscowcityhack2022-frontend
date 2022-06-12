import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import css from './index.module.css';

const ComingSoon: FC = () => {
  return (
    <div className={css.resultHolder}>
      <Result icon={<SmileOutlined />} title={'Cooming soon'} subTitle={'This section will be available later!'} />
    </div>
  );
};

export default ComingSoon;
