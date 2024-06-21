import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import filterReducer from './filterReducer';
import undoredo from './undoredo';

const rootReducer = combineReducers({
  todos: undoredo(todoReducer),
  filter: filterReducer,
});

export default rootReducer;