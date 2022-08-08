import { AnalyzeInitialData, AnalyzeStatus, AnalyzisData } from 'types';
import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

const selectAnalyzeStatus = (state: RootState): AnalyzeStatus => state.analyzer.analyzeStatus;

const selectInitialData = (state: RootState): RemoteData<AnalyzeInitialData> => state.analyzer.initialData;

const selectAnalyzisData = (state: RootState): RemoteData<AnalyzisData> => state.analyzer.analyzisData;

export { selectAnalyzeStatus, selectInitialData, selectAnalyzisData };
