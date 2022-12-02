import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import LoginPage from './pages/Login';
import Pedidos from './pages/Pedidos';
import ProductsPage from './pages/Products';
import RegisterPage from './pages/Register';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
        <Route path="/customer/products" component={ ProductsPage } />
        <Route path="/customer/checkout" component={ CheckoutPage } />
        <Route path="/customer/orders" component={ Pedidos } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
