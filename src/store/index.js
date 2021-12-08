import { createStore, combineReducers } from 'redux';
import ItemsListReducer from '../reducers/ItemsListReducer.js';
import CreateItemFormReducer from '../reducers/CreateItemFormReducer.js';

const reducer = combineReducers({
  itemsListReducer: ItemsListReducer,
  createItemFormReducer: CreateItemFormReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
