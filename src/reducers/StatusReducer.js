import { SET_LOADING, SET_ERROR, SET_EDIT_STATUS } from '../actions/actionTypes';

const initialState = { loading: false, error: false, editStatus: false };

export default function StatusReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOADING:
        return {...state, loading: action.payload};
      case SET_ERROR:
        return { ...state, error: action.payload};
      case SET_EDIT_STATUS:
        return { ...state, editStatus: action.payload };
      default:
        return state;
    }
  }