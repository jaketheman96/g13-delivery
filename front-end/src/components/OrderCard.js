import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

function OrderCard({ id, price, date, status, address, deliveryNumber }) {
  const MINIMUN_ZEROS = 3;

  const { userInfos } = useContext(DeliveryContext);

  const userRole = () => {
    if (userInfos) {
      switch (userInfos.role) {
      case 'seller':
        return 'seller';
      case 'admin':
        return 'admin';
      default:
        return 'customer';
      }
    }
  };

  return (
    <Link
      to={ `/${userRole()}/orders/${id}` }
      style={ {
        textDecoration: 'none',
        color: 'black',
      } }
    >
      <div style={ { display: 'flex', justifyContent: 'space-evenly' } }>
        <h5
          data-testid={ `${userRole()}_orders__element-order-id-${id}` }
        >
          {`Pedido: ${id.toString().padStart(MINIMUN_ZEROS, '0')}`}
        </h5>
        <h2
          data-testid={ `${userRole()}_orders__element-delivery-status-${id}` }
        >
          {status}
        </h2>
        <h4
          data-testid={ `${userRole()}_orders__element-order-date-${id}` }
        >
          {date}
        </h4>
        <h4
          data-testid={ `${userRole()}_orders__element-card-price-${id}` }
        >
          {price.replace('.', ',')}
        </h4>
        <p data-testid={ `${userRole()}_orders__element-card-address-${id}` }>
          {userRole() === 'seller' && `${address}, ${deliveryNumber}` }
        </p>
      </div>
    </Link>
  );
}

OrderCard.defaultProps = {
  address: '',
  deliveryNumber: '',
};

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  address: PropTypes.string,
  deliveryNumber: PropTypes.string,
};

export default OrderCard;
