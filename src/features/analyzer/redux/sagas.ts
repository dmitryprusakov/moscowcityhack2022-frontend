/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SagaIterator } from 'redux-saga';
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { AnalyzeInitialData, AnalyzisData } from 'types';
import { pending, success } from 'libs/remote';

import { checkAnalysisData, sendDataToAnalyzis, setAnalysisData, setAnalyzeStatus, setInitialData } from './slice';

const axiosInstance = axios.create({
  baseURL: 'http://82.146.37.120:7878',
});

function* analyzerSaga(): SagaIterator {
  yield all([
    takeLatest(sendDataToAnalyzis, function* sendDataToAnalyzisSaga({ payload }) {
      try {
        console.log(payload);

        yield put(setInitialData(pending()));
        yield delay(1000);

        const { data }: AxiosResponse<AnalyzeInitialData> = yield axiosInstance.post('/api/v1/documents/', payload);

        console.log('data', data);

        yield put(setInitialData(success({ text: data.text, title: data.title, arid: data.arid })));

        yield put(setAnalyzeStatus('processing'));
        yield put(checkAnalysisData(data.arid));
      } catch (error) {
        const { response, config } = error as AxiosError;
        console.log({ status: response?.status, requestUrl: config?.url || '' });

        // yield put(setInitialData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
    takeLatest(checkAnalysisData, function* checkAnalysisDataSaga({ payload }) {
      try {
        const { data }: AxiosResponse<AnalyzisData> = yield axiosInstance.get(`/api/v1/analysis_results/${payload}`);

        console.log('checkAnalysisData', data);

        yield put(setAnalysisData(success(data)));

        if (data.status === 'IN_PROGRESS') {
          yield delay(10000);
          yield put(checkAnalysisData(payload));
        }
        if (data.status === 'DONE') {
          yield put(setAnalyzeStatus('success'));
        }
      } catch (error) {
        const { response, config } = error as AxiosError;
        console.log({ status: response?.status, requestUrl: config?.url || '' });

        yield delay(10000);
        yield put(checkAnalysisData(payload));

        // yield put(setAnalysisData(failure({ status: response?.status, requestUrl: config?.url || '' })));
      }
    }),
  ]);
}

export default analyzerSaga;
