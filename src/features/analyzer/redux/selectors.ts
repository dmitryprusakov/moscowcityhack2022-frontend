import { AnalyzeInitialData, AnalyzisData, Block1, Block2 } from 'types';
import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

const selectInitialData = (state: RootState): RemoteData<AnalyzeInitialData> => state.analyzer.initialData;

const selectAnalyzisData = (state: RootState): RemoteData<AnalyzisData> => state.analyzer.analyzisData;

const selectAnalyzisDataBlock1 = (state: RootState): RemoteData<Block1> => state.analyzer.analyzisDataBlock1;

const selectAnalyzisDataBlock2 = (state: RootState): RemoteData<Block2> => state.analyzer.analyzisDataBlock2;

export { selectInitialData, selectAnalyzisData, selectAnalyzisDataBlock1, selectAnalyzisDataBlock2 };
