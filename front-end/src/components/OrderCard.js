import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import user from '../utils/roleValidator';

function OrderCard({ id, price, date, status, address, deliveryNumber }) {
  const MINIMUN_ZEROS = 3;

  const { userInfos } = useContext(DeliveryContext);

  const reduceLength = () => {
    if (userInfos) {
      return `${user.userRole(userInfos)}_orders__element-`;
    }
  };

  return (
    <Link
      to={ `/${user.userRole(userInfos)}/orders/${id}` }
      style={ {
        textDecoration: 'none',
        color: 'black',
      } }
    >
      <div style={ { display: 'flex', justifyContent: 'space-evenly' } }>
        <h5
          data-testid={ `${reduceLength()}order-id-${id}` }
        >
          {`Pedido: ${id.toString().padStart(MINIMUN_ZEROS, '0')}`}
        </h5>
        <h2
          data-testid={ `${reduceLength()}delivery-status-${id}` }
        >
          {status}
        </h2>
        <h4
          data-testid={ `${reduceLength()}order-date-${id}` }
        >
          {date}
        </h4>
        <h4
          data-testid={ `${reduceLength()}card-price-${id}` }
        >
          {price.replace('.', ',')}
        </h4>
        <p data-testid={ `${reduceLength()}card-address-${id}` }>
          {user.userRole(userInfos) === 'seller' && `${address}, ${deliveryNumber}` }
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
