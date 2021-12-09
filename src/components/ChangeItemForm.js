import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditStatus, editItem, addItem, setLoading, setError } from '../actions/actionCreators';
import { Redirect, Route } from 'react-router';
import Ring from './Ring';
import Error from './Error';

export default function ChangeItemForm({ match: { url }}) {
  console.log('change')
  const item = useSelector((state) => state.createItemFormReducer);
  const loading = useSelector(state => state.statusReducer.loading);
  const error = useSelector(state => state.statusReducer.error)
  const editStatus = useSelector(state => state.statusReducer.editStatus);
  
  const dispatch = useDispatch();

  const getItem = async () => {
    dispatch(setLoading(true));
      try {
          const json = await fetch('http://localhost:7070/api' + url);
          const data = await json.json();
          dispatch(editItem(data));          
      } catch (error) {
        dispatch(setError(true));
        console.log(error);
        setTimeout(() => {
          dispatch(setError(false));
          getItem();                 
        }, 1000);
      } finally {
        dispatch(setLoading(false));
      }
  }

  useEffect(() => {
    getItem();
  },[])

  const sendEditedItem = async () => {
    dispatch(setLoading(true));
      try {
          await fetch('http://localhost:7070/api/services', { method: 'POST', headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, body: JSON.stringify(item)});
          console.log('я тут')
          dispatch(setLoading(false));
          dispatch(setEditStatus(false));        
      } catch (error) {
        dispatch(setError(true));
        setTimeout(() => {
          dispatch(setError(false));
          sendEditedItem()
        }, 700);
        console.log(error)
      } finally {
        console.log(editStatus)
        dispatch(setError(false));
        onCancelClick();

      }
  }


  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const onSaveClick = () => {
    if (!item.name || !item.price) {
      console.log('Заполните поля имя и стоимость');
      return;
    }
    dispatch(addItem(item));
    sendEditedItem();
  };

  const onCancelClick = () => {
    dispatch(editItem({...item, name: '', price: '', content: '' }));
  };

  const onChangeHandler = (e) => {
    if (!editStatus) { 
      dispatch(setEditStatus(true)); 
      return;
    };
    const { name, value } = e.target;
    dispatch(editItem({...item, [name]: value }));
  };

  if(loading) return <Ring />
  if(error) return <Error />

  return ( !editStatus ? <Redirect to={'/services'} /> :
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
