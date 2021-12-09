import { EDIT_ITEM } from '../actions/actionTypes';

const initialState = { id: '', name: '', price: '', content: '' };

export default function CreateItemFormReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_ITEM:
      return action.payload;
    default:
      return state;
  }
}