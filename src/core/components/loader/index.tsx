import { Skeleton as AntdSkeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import css from './index.module.css';

export const Loader: FC = () => {
  return (
    <div className={css.loaderHolder}>
      <LoadingOutlined className={css.loader} />
    </div>
  );
};

interface SkeletonProps {
  paragraphRowsCount?: number;
}

export const Skeleton: FC<SkeletonProps> = ({ paragraphRowsCount }: SkeletonProps) => {
  return paragraphRowsCount ? (
    <AntdSkeleton paragraph={{ rows: paragraphRowsCount }} title={false} className={css.skeleton} />
  ) : (
    <AntdSkeleton.Input size="small" className={css.skeleton} block />
  );
};
