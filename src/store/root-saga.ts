import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { analyzerSaga } from 'features/analyzer/redux';

export default function* rootSaga(): SagaIterator {
  yield all([fork(analyzerSaga)]);
}
