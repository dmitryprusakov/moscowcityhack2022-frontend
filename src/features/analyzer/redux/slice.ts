import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AnalyzeInitialData, AnalyzisData, Block1, Block2, FormFields } from 'types';
import { RemoteData, initialized } from 'libs/remote';

export interface AnalyzerState {
  initialData: RemoteData<AnalyzeInitialData>;
  analyzisData: RemoteData<AnalyzisData>;
  analyzisDataBlock1: RemoteData<Block1>;
  analyzisDataBlock2: RemoteData<Block2>;
}

const initialState: AnalyzerState = {
  initialData: initialized() as RemoteData<AnalyzeInitialData>,
  analyzisData: initialized() as RemoteData<AnalyzisData>,
  analyzisDataBlock1: initialized() as RemoteData<Block1>,
  analyzisDataBlock2: initialized() as RemoteData<Block2>,
};

export const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState,
  reducers: {
    sendDataToAnalyzis: (_state, _action: PayloadAction<FormFields>) => {},
    setInitialData: (state, action: PayloadAction<RemoteData<AnalyzeInitialData>>) => {
      state.initialData = action.payload;
    },
    checkAnalysisData: (_state, _action: PayloadAction<string>) => {},
    setAnalysisData: (state, action: PayloadAction<RemoteData<AnalyzisData>>) => {
      state.analyzisData = action.payload;
    },
    // setAnalysisDataBlock1: (state, action: PayloadAction<RemoteData<Block1>>) => {
    //   state.analyzisDataBlock1 = action.payload;
    // },
    // setAnalysisDataBlock2: (state, action: PayloadAction<RemoteData<Block2>>) => {
    //   state.analyzisDataBlock2 = action.payload;
    // },
  },
});

export const {
  sendDataToAnalyzis,
  setInitialData,
  checkAnalysisData,
  setAnalysisData,
  // setAnalysisDataBlock1,
  // setAnalysisDataBlock2,
} = analyzerSlice.actions;
export default analyzerSlice.reducer;
