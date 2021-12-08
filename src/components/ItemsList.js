import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditStatus,
  removeItem,
  setSortValue,
  editItem,
} from '../actions/actionCreators';
import { EDIT_ITEM } from '../actions/actionTypes';
import Ring from './Ring';
import Error from './Error';
import CreateItemForm from './CreateItemForm';
import store from "../store"
import { Redirect, Route } from 'react-router';

export default function ItemsList() {
  const items = useSelector((state) => {
    const items = state.itemsListReducer.items;
    const re = new RegExp(state.itemsListReducer.sortValue, 'i');
    const sortedArray = items.filter((e) => re.exec(e.name));
    return sortedArray;
  });

  const item = useSelector(state => state.createItemFormReducer);
  console.log(editItem)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [onEdit, setOnEdit] = useState(false);


  const renderAllData = async () => {
      setLoading(true);
      try {
        const json = await fetch('http://localhost:7070/api/services');
        const data = await json.json();
        console.log(data)
        dispatch({type: 'ALL_ITEMS', payload: data})
      } catch (error) {
        setError(true);
        console.log(error)
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    renderAllData();    
  }, []);

  const dispatch = useDispatch();
  const [sortInput, setSortInput] = useState('');

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:7070/api/services/${id}`, {method: 'DELETE'});
    } catch (error) {
      setError(true);
    } finally {
      renderAllData();
    }
  };

  const edit = (e) => {
    const { id, name, price, content } = e;
    dispatch(editItem({
      item: { id, name, price, content },
      editStatus: true,
    }));
  };

  const sortValueChangeHandler = (e) => {
    setSortInput(e.target.value);
    dispatch(setSortValue(e.target.value));
  };

  if(loading) return <Ring />
  if(error) return <Error />

  return ( item.editStatus ? <Redirect to={/services/ + item.item.id} /> : 
    <React.Fragment>
      <CreateItemForm />
      <div style={{ marginTop: 25 }}>Фильтр:</div>
      <input value={sortInput} onChange={(e) => sortValueChangeHandler(e)} />
      {sortInput ? (
        <button
          style={{ marginLeft: 5 }}
          onClick={() => {
            sortValueChangeHandler({ target: { value: '' } });
          }}
        >
          Очистить
        </button>
      ) : null}
      <ul className="work-item-container">
        {items.map((e) => (
          <li id={e.id} key={e.id}>
            {e.name} {e.price}
            <button onClick={() => edit(e)} className="btn edit-button">
              ✎
            </button>
            <button
              onClick={() => deleteItem(e.id)}
              className="btn delete-button"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
