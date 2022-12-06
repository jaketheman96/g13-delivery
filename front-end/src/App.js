import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import CheckoutPage from './pages/Checkout';
import DetalhesDoPedido from './pages/DetalhesDoPedido';
import LoginPage from './pages/Login';
import Pedidos from './pages/Pedidos';
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
        <Route path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/customer/orders" component={ Pedidos } />
        <Route path="/customer/orders/:id" component={ DetalhesDoPedido } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
