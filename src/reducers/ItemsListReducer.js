import { nanoid } from 'nanoid';
import { ADD_ITEM, REMOVE_ITEM, SET_SORT_VALUE, ALL_ITEMS } from '../actions/actionTypes';

const initialState = {
  items: [],
  sortValue: '',
};

export default function ItemsListReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_ITEMS:
      state.items = action.payload;
      return state;
    case ADD_ITEM:
      const { id, name, price, content } = action.payload;
      const index = state.items.findIndex((e) => e.id === id);
      if (index >= 0) {
        const newState = { ...state };
        newState.items[index].name = name;
        newState.items[index].price = price;
        newState.items[index].content = content;
        return newState;
      }
      return {
        ...state,
        items: [...state.items, { id: nanoid(), name, price, content }],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: [...state.items.filter((e) => e.id !== action.payload)],
      };
    case SET_SORT_VALUE:
      return { ...state, sortValue: action.payload };
    default:
      return state;
  }
}
