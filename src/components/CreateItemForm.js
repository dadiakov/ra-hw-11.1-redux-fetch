import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editItem, setLoading, setError, allItems } from '../actions/actionCreators';
import Ring from './Ring';
import Error from './Error';

export default function CreateItemForm() {
  const item = useSelector((state) => state.createItemFormReducer);
  const loading = useSelector(state => state.statusReducer.loading);
  const error = useSelector(state => state.statusReducer.error)
  const [onEdit, setOnEdit] = useState(false);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const onSaveClick = () => {
    if (!item.name || !item.price) {
      console.log('Заполните поля имя и стоимость');
      return;
    }
    addNewItem();
  };

  const addNewItem = async () => {
    dispatch(setLoading(true));
      try {
        await fetch('http://localhost:7070/api/services', { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify({...item, id: 0 })
        });       
      } catch (error) {
        dispatch(setError(true));
        console.log(error);
        setTimeout(() => {
          dispatch(setError(false));                
        }, 1000);
      } finally {
        renderAllData();
        onCancelClick();
      }
  }

  const renderAllData = async () => {
    dispatch(setLoading(true));
    try {
      const json = await fetch('http://localhost:7070/api/services');
      const data = await json.json();
      dispatch(allItems(data))
    } catch (error) {
      dispatch(setError(true));
      setTimeout(() => {
        dispatch(setError(false));
        renderAllData();                    
      }, 1000);
    } finally {
      dispatch(setLoading(false));
    }
  }

  const onCancelClick = () => {
    dispatch(editItem({...item, name: '', price: '', content: '' }));
    setOnEdit(false)
  };

  const onChangeHandler = ({ target : { name, value }}) => {
    if (!onEdit) setOnEdit(true);
    dispatch(editItem({...item, [name]: value }));
  };

  if(loading) return <Ring />
  if(error) return <Error />

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
      {onEdit ? (
        <button onClick={onCancelClick} className="btn cancel-button">
          Cancel
        </button>
      ) : null}
    </form>
  );
}
