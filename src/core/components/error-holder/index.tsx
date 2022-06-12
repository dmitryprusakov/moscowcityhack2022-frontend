import { Button, Result } from 'antd';
import React, { FC } from 'react';

import { ErrorInfo } from 'types';

import css from './index.module.css';

interface ErrorHolderProps {
  error: ErrorInfo;
  retryRequest?: () => void;
}

const ErrorHolder: FC<ErrorHolderProps> = ({ error, retryRequest }: ErrorHolderProps) => {
  return (
    <div className={css.errorHolder}>
      <Result
        className={css.result}
        status="warning"
        title={'Error'}
        subTitle={`Requested URL: "${error.requestUrl}". Status: "${error.status || 'n/a'}".`}
        extra={
          <>
            {retryRequest && (
              <Button key="retry" type="primary" onClick={retryRequest}>
                Retry
              </Button>
            )}
          </>
        }
      />
    </div>
  );
};

export default ErrorHolder;
