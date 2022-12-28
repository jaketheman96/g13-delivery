import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';
import getItensFromStorage from '../utils/getItensFromStorage';

function DeliveryProvider({ children }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userInfos, setUserInfos] = useState();
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [btnActive, setBtnActive] = useState('Products');
  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    const handleTotal = () => {
      let totalValue = 0;
      for (let i = 0; i < cart.length; i += 1) {
        totalValue += Number(cart[i].price * cart[i].quantity);
      }
      setTotalCartPrice(totalValue);
    };
    handleTotal();
  }, [cart, setTotalCartPrice]);

  useEffect(() => {
    const getStorage = () => {
      const userData = getItensFromStorage('user');
      const restoredCart = getItensFromStorage('cart');
      if (restoredCart) {
        setCart(restoredCart);
      }
      if (userData) {
        setUserInfos(userData);
      }
    };
    getStorage();
  }, []);

  const globalState = React.useMemo(() => ({
    isButtonDisabled,
    setIsButtonDisabled,
    userInfos,
    setUserInfos,
    cart,
    setCart,
    totalCartPrice,
    setTotalCartPrice,
    btnActive,
    setBtnActive,
    statusColor,
    setStatusColor,
  }), [
    isButtonDisabled,
    userInfos,
    totalCartPrice,
    cart,
    btnActive,
    statusColor,
  ]);

  return (
    <DeliveryContext.Provider value={ globalState }>
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DeliveryProvider;
