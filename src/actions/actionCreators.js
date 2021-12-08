import {
    ADD_ITEM,
    REMOVE_ITEM,
    EDIT_ITEM,
    SET_EDIT_STATUS,
    SET_SORT_VALUE,
} from './actionTypes';
  
export function setEditStatus(status) {
    return { type: SET_EDIT_STATUS, payload: status };
}
  
export function removeItem(id) {
    return { type: REMOVE_ITEM, payload: id };
}
  
export function editItem(item) {
    return { type: EDIT_ITEM, payload: item };
}
  
export function addItem(item) {
    return { type: ADD_ITEM, payload: item }
}
  
export function setSortValue(value) {
    return { type: SET_SORT_VALUE, payload: value }
}