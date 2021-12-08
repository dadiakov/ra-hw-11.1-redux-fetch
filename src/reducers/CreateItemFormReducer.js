import { EDIT_ITEM, SET_EDIT_STATUS } from '../actions/actionTypes';

const initialState = {
  item: { id: '', name: '', price: '', content: '' },
  editStatus: false,
};

export default function CreateItemFormReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_ITEM:
      console.log(action.payload)
      return action.payload;
    case SET_EDIT_STATUS:
      return { ...state, editStatus: action.payload };
    default:
      return state;
  }
}