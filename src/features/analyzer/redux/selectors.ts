import { AnalyzeInitialData, AnalyzisData } from 'types';
import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

const selectInitialData = (state: RootState): RemoteData<AnalyzeInitialData> => state.analyzer.initialData;

const selectAnalyzisData = (state: RootState): RemoteData<AnalyzisData> => state.analyzer.analyzisData;

export { selectInitialData, selectAnalyzisData };
