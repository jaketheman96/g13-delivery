import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import LoginPage from './pages/Login';
import ProductsPage from './pages/Products';
import RegisterPage from './pages/Register';

function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
        <Route path="/customer/products" component={ ProductsPage } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
