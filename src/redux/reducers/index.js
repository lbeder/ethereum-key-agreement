import { combineReducers } from 'redux';

import blockchain from './blockchain';

const rootReducer = combineReducers({
  blockchain,
});

export default rootReducer;
