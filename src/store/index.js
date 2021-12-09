import { createStore, combineReducers } from 'redux';
import ItemsListReducer from '../reducers/ItemsListReducer.js';
import CreateItemFormReducer from '../reducers/CreateItemFormReducer.js';
import StatusReducer from '../reducers/StatusReducer.js'

const reducer = combineReducers({
  itemsListReducer: ItemsListReducer,
  createItemFormReducer: CreateItemFormReducer,
  statusReducer: StatusReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
