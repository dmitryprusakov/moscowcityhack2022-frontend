/* eslint-disable @typescript-eslint/no-explicit-any */
import { SagaIterator } from 'redux-saga';
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { AnalyzeInitialData, AnalyzisData } from 'types';
import { failure, pending, success } from 'libs/remote';

import { checkAnalysisData, sendDataToAnalyzis, setAnalysisData, setInitialData } from './slice';
import { testData, testText } from './fake-data';

const axiosInstance = axios.create({
  baseURL: 'http://84.252.137.43:8000',
});

function* analyzerSaga(): SagaIterator {
  yield all([
    takeLatest(sendDataToAnalyzis, function* sendDataToAnalyzisSaga({ payload }) {
      try {
        console.log(payload);

        yield put(setInitialData(pending()));
        yield delay(1000);

        // const { data }: AxiosResponse<AnalyzeInitialData> = yield axiosInstance.post('/api/docs/', payload);

        // console.log('data', data);

        yield put(setInitialData(success({ text: testText, title: 'kek', ar_id: '1' })));

        // const { ar_id: arId } = data;

        yield put(checkAnalysisData('1'));
      } catch (error) {
        const { response, config } = error as AxiosError;

        yield put(setInitialData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(checkAnalysisData, function* checkAnalysisDataSaga({ payload }) {
      try {
        yield put(setAnalysisData(pending()));

        console.log('checkAnalysisData');

        // const { data }: AxiosResponse<AnalyzisData> = yield axiosInstance.get(`/api/analysis-results/${payload}`);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (Object.values(testData).some((val) => !val)) {
          yield delay(1000);

          yield put(checkAnalysisData(payload));
        }
        // } else {
        //   console.log('finish', testData);

        yield put(setAnalysisData(success(testData)));
        // }
      } catch (error) {
        const { response, config } = error as AxiosError;
        yield put(setAnalysisData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default analyzerSaga;
