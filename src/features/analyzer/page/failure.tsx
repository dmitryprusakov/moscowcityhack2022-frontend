import React, { FC } from 'react';

import { ErrorHolder } from 'core/components';
import { useAppDispatch } from 'store';
import { ErrorInfo } from 'types';

export interface AnalyzisFailureProps {
  error: ErrorInfo;
}
const AnalyzisFailure: FC<AnalyzisFailureProps> = ({ error }: AnalyzisFailureProps) => {
  const dispatch = useAppDispatch();

  const retryRequest = () => {
    // dispatch(fetchAnalyzis());
  };

  return <ErrorHolder error={error} retryRequest={retryRequest} />;
};

export default AnalyzisFailure;
