import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import CheckoutPage from './pages/Checkout';
import LoginPage from './pages/Login';
import Pedidos from './pages/Pedidos';
import ProductsPage from './pages/Products';
import RegisterPage from './pages/Register';
import SellerPage from './pages/SellerOrders';
import AdminPage from './pages/Admin';

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
        <Route path="/seller/orders" component={ SellerPage } />
        <Route path="/admin/manage" component={ AdminPage } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
