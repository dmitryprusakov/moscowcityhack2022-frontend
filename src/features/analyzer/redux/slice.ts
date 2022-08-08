import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AnalyzeInitialData, AnalyzeStatus, AnalyzisData, FormFields } from 'types';
import { RemoteData, initialized } from 'libs/remote';

export interface AnalyzerState {
  analyzeStatus: AnalyzeStatus;
  initialData: RemoteData<AnalyzeInitialData>;
  analyzisData: RemoteData<AnalyzisData>;
}

const initialState: AnalyzerState = {
  analyzeStatus: null,
  initialData: initialized() as RemoteData<AnalyzeInitialData>,
  analyzisData: initialized() as RemoteData<AnalyzisData>,
};

export const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState,
  reducers: {
    setAnalyzeStatus: (state, action: PayloadAction<AnalyzeStatus>) => {
      state.analyzeStatus = action.payload;
    },
    sendDataToAnalyzis: (_state, _action: PayloadAction<FormFields>) => {},
    setInitialData: (state, action: PayloadAction<RemoteData<AnalyzeInitialData>>) => {
      state.initialData = action.payload;
    },
    checkAnalysisData: (_state, _action: PayloadAction<string>) => {},
    setAnalysisData: (state, action: PayloadAction<RemoteData<AnalyzisData>>) => {
      state.analyzisData = action.payload;
    },
  },
});

export const { setAnalyzeStatus, sendDataToAnalyzis, setInitialData, checkAnalysisData, setAnalysisData } =
  analyzerSlice.actions;
export default analyzerSlice.reducer;
