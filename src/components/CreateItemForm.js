import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditStatus, editItem, addItem } from '../actions/actionCreators';

export default function CreateItemForm() {
  const item = useSelector((state) => state.createItemFormReducer.item);
  const editStatus = useSelector(
    (state) => state.createItemFormReducer.editStatus
  );
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const onSaveClick = () => {
    if (!item.name || !item.price) {
      console.log('Заполните поля имя и стоимость');
      return;
    }
    dispatch(addItem(item));
    onCancelClick();
  };

  const onCancelClick = () => {
    dispatch(editItem({ name: '', price: '', content: '' }));
    dispatch(setEditStatus(false));
  };

  const onChangeHandler = (e) => {
    dispatch(setEditStatus(true));
    const { name, value } = e.target;
    dispatch(editItem({ ...item, [name]: value }));
  };

  return (
    <form onSubmit={onFormSubmit} action="">
      <input
        name="name"
        value={item.name}
        onChange={onChangeHandler}
        type="text"
        placeholder="name"
      />
      <input
        name="price"
        value={item.price}
        onChange={onChangeHandler}
        type="number"
        placeholder="price"
      />
      <input
        name="content"
        value={item.content}
        onChange={onChangeHandler}
        type="text"
        placeholder="content"
      />
      <button onClick={onSaveClick} className="btn save-button">
        Save
      </button>
      {editStatus ? (
        <button onClick={onCancelClick} className="btn cancel-button">
          Cancel
        </button>
      ) : null}
    </form>
  );
}
