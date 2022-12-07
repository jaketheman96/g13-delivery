import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ id, price, date, status }) {
  const MINIMUN_ZEROS = 3;

  return (
    <div style={ { display: 'flex', justifyContent: 'space-evenly' } }>
      <h5
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        {`Pedido: ${id.toString().padStart(MINIMUN_ZEROS, '0')}`}
      </h5>
      <h2
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </h2>
      <h4
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        {date}
      </h4>
      <h4
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        {price.replace('.', ',')}
      </h4>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default OrderCard;
