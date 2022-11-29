import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import LoginPage from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <DeliveryProvider>
        <Switch>
          <Route path="/login" component={ LoginPage } />
        </Switch>
      </DeliveryProvider>
    </BrowserRouter>
  );
}

export default App;
