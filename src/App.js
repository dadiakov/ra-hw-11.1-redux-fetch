import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ItemsList from './components/ItemsList';
import ChangeItemForm from './components/ChangeItemForm'


export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/services/:id" component={ChangeItemForm}/ >
          <Route path="/services" component={ItemsList}/ >
          <Route path="/" component={RedirectToItemsList}/ >
        </Switch>
      </Router>
    </React.Fragment>
  );
}

const RedirectToItemsList = () => {
  return (
    <Redirect to="/services" />
  )
}