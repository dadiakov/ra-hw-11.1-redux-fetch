import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditStatus, editItem, addItem } from '../actions/actionCreators';
import Ring from './Ring';
import Error from './Error';

export default function ChangeItemForm({ match: { url }}) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editStatus, setEditStatus] = useState(true);
  
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
      try {
          const json = await fetch('http://localhost:7070/api' + url);
          const data = await json.json();
          setItem(data);          
      } catch (error) {
        setError(true);
        console.log(error)
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchData();
  },[])


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
      {editStatus ? (
        <button onClick={onCancelClick} className="btn cancel-button">
          Cancel
        </button>
      ) : null}
    </form>
  );
}
