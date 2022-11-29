import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const globalState = React.useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [
    email,
    password,
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
