import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import LoginPage from './pages/Login';

function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={ LoginPage } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
