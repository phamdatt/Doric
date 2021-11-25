import incrementReducer from './reducer/incrementReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  increment: incrementReducer,
});
export default rootReducer;
