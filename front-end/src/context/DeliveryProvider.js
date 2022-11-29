import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [teste, setTeste] = useState('');
  const [teste2, setTeste2] = useState('');

  const globalState = React.useMemo(() => ({
    teste,
    setTeste,
    teste2,
    setTeste2,
  }), [teste, teste2]);

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
