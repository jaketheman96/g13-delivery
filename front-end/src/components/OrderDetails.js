import React from 'react';
import Proptypes from 'prop-types';

function OrderDetails({ id, seller: { name }, saleDate, status }) {
  return (
    <div>
      {id}
      {name}
      {saleDate}
      {status}
    </div>
  );
}

OrderDetails.propTypes = {
  id: Proptypes.number.isRequired,
  seller: Proptypes.shape({ name: Proptypes.string.isRequired }).isRequired,
  saleDate: Proptypes.string.isRequired,
  status: Proptypes.string.isRequired,
};

export default OrderDetails;
