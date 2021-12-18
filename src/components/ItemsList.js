import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditStatus,
  setSortValue,
  editItem,
  setLoading,
  setError,
  allItems,
} from '../actions/actionCreators';
import Ring from './Ring';
import Error from './Error';
import CreateItemForm from './CreateItemForm';
import { Redirect } from 'react-router';

export default function ItemsList() {
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

  const loading = useSelector(state => state.statusReducer.loading);
  const error = useSelector(state => state.statusReducer.error)

  const [sortInput, setSortInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    renderAllData();    
  }, []);
  
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
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
  }

  const deleteItem = async (id) => {
    dispatch(setLoading(true));
    try {
      await fetch(`http://localhost:7070/api/services/${id}`, {method: 'DELETE'});
    } catch (error) {
      dispatch(setError(true));
      setTimeout(() => {
        dispatch(setError(false));                    
      }, 1000);
    } finally {
      dispatch(setLoading(false));
      renderAllData();
    }
  };

  const edit = (e) => {
    const { id, name, price, content } = e;
    dispatch(editItem({ id, name, price, content }));
    dispatch(setEditStatus(true))
  };

  const sortValueChangeHandler = ({ target: { value }}) => {
    setSortInput(value);
    dispatch(setSortValue(value));
  };

  if(loading) return <Ring />
  if(error) return <Error />

  return ( editStatus ? <Redirect to={/services/ + item.id} /> : 
    <React.Fragment>
      <CreateItemForm />
      <div className="filter">Фильтр:</div>
      <input value={sortInput} onChange={(e) => sortValueChangeHandler(e)} />
      {sortInput ? (
        <button
          className="clear-filter-btn"
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
