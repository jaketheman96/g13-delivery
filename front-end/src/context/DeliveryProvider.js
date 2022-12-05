import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userInfos, setUserInfos] = useState();
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const globalState = React.useMemo(() => ({
    isButtonDisabled,
    setIsButtonDisabled,
    userInfos,
    setUserInfos,
    totalCartPrice,
    setTotalCartPrice,
  }), [
    isButtonDisabled,
    userInfos,
    totalCartPrice,
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
