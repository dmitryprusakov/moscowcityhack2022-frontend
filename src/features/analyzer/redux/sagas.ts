/* eslint-disable @typescript-eslint/no-explicit-any */
import { SagaIterator } from 'redux-saga';
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { AnalyzeInitialData } from 'types';
import { failure, pending, success } from 'libs/remote';

import {
  checkAnalysisData,
  sendDataToAnalyzis,
  setAnalysisData,
  setAnalysisDataBlock1,
  setAnalysisDataBlock2,
  setInitialData,
} from './slice';
import { testData, testText } from './fake-data';

function* analyzerSaga(): SagaIterator {
  yield all([
    takeLatest(sendDataToAnalyzis, function* sendDataToAnalyzisSaga({ payload }) {
      try {
        console.log(payload);

        yield put(setInitialData(pending()));
        yield delay(3000);

        // const { data }: AxiosResponse<AnalyzeInitialData> = yield axios.post('/api/docs', payload);
        const data = { ar_id: '1', title: 'Wow!', text: testText };
        yield put(setInitialData(success(data)));

        const { ar_id: arId } = data;

        yield put(checkAnalysisData(arId));
      } catch (error) {
        const { response, config } = error as AxiosError;

        yield put(setInitialData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(checkAnalysisData, function* checkAnalysisDataSaga({ payload }) {
      try {
        yield put(setAnalysisData(pending()));

        // const { data }: AxiosResponse<AnalyzisData> = yield axios.get(`/api/analysis-results?ar_id=${payload}`);
        if (testData.blocksCountForLoading !== 0) {
          console.log('wait', testData);

          testData.data.block1 = {
            loaded: true,
          };
          testData.data.block2 = {
            loaded: true,
          };
          testData.blocksCountForLoading = testData.blocksCountForLoading - 1;
          if (testData.data.block1) {
            yield put(setAnalysisDataBlock1(success(testData.block1)));
          }
          if (testData.data.block2) {
            yield put(setAnalysisDataBlock2(success(testData.block2)));
          }
          yield delay(2000);

          yield put(checkAnalysisData(payload));
        } else {
          console.log('finish', testData);

          yield put(setAnalysisData(success(testData)));
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setAnalysisData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default analyzerSaga;
