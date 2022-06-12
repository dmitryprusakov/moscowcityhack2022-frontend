import { combineReducers } from '@reduxjs/toolkit';

import { analyzerReducer } from 'features/analyzer/redux';

const rootReducer = combineReducers({
  analyzer: analyzerReducer,
});

export default rootReducer;
