import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditStatus,
  removeItem,
  setSortValue,
  editItem,
  setLoading,
  setError
} from '../actions/actionCreators';
import { EDIT_ITEM } from '../actions/actionTypes';
import Ring from './Ring';
import Error from './Error';
import CreateItemForm from './CreateItemForm';
import store from "../store"
import { Redirect, Route } from 'react-router';

export default function ItemsList() {
  console.log('itemlist')
  const items = useSelector((state) => {
    const items = state.itemsListReducer.items;
    const re = new RegExp(state.itemsListReducer.sortValue, 'i');
    const sortedArray = items.filter((e) => re.exec(e.name));
    return sortedArray;
  });
  const item = useSelector(state => state.createItemFormReducer);
  const editStatus = useSelector(
    (state) => state.statusReducer.editStatus
  );
  console.log(editStatus)

  const loading = useSelector(state => state.statusReducer.loading);
  const error = useSelector(state => state.statusReducer.error)



  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [onEdit, setOnEdit] = useState(false);


  const renderAllData = async () => {
      dispatch(setLoading(true));
      try {
        const json = await fetch('http://localhost:7070/api/services');
        const data = await json.json();
        dispatch({type: 'ALL_ITEMS', payload: data})
      } catch (error) {
        dispatch(setError(true));
        setTimeout(() => {
          dispatch(setError(false));
          renderAllData();                    
        }, 1000);
        console.log(error)
      } finally {
        dispatch(setLoading(false));
      }
  }

  useEffect(() => {
    renderAllData();    
  }, []);

  const dispatch = useDispatch();
  const [sortInput, setSortInput] = useState('');

  const deleteItem = async (id) => {
    dispatch(setLoading(true));
    try {
      await fetch(`http://localhost:7070/api/services/${id}`, {method: 'DELETE'});
    } catch (error) {
      dispatch(setError(true));
      setTimeout(() => {
        dispatch(setError(false));
        renderAllData();                    
      }, 1000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const edit = (e) => {
    const { id, name, price, content } = e;
    dispatch(editItem({ id, name, price, content }));
    dispatch(setEditStatus(true))
  };

  const sortValueChangeHandler = (e) => {
    setSortInput(e.target.value);
    dispatch(setSortValue(e.target.value));
  };

  if(loading) return <Ring />
  if(error) return <Error />

  return ( editStatus ? <Redirect to={/services/ + item.id} /> : 
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
        {items.map((item) => (
          <li id={item.id} key={item.id}>
            {item.name} {item.price}
            <button onClick={() => edit(item)} className="btn edit-button">
              ✎
            </button>
            <button
              onClick={() => deleteItem(item.id)}
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
