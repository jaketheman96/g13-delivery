import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import user from '../utils/roleValidator';

function OrderCard({ id, price, date, status, address, deliveryNumber }) {
  const MINIMUN_NUMBERS = 4;

  const { userInfos } = useContext(DeliveryContext);

  const reduceLength = () => {
    if (userInfos) {
      return `${user.userRole(userInfos)}_orders__element-`;
    }
  };

  const statusColor = () => {
    switch (status) {
    case 'Pendente':
      return '209, 189, 12';
    case 'Preparando':
      return '150, 247, 102';
    case 'Em Trânsito':
      return '218, 122, 5';
    default:
      return '40, 217, 220';
    }
  };

  return (
    <div
      className={ userInfos
        ? `${user.userRole(userInfos)}-orders-card`
        : null }
    >
      <Link
        to={ `/${user.userRole(userInfos)}/orders/${id}` }
        style={ {
          textDecoration: 'none',
          color: 'black',
        } }
      >
        <div className="order-id">
          <span
            data-testid={ `${reduceLength()}order-id-${id}` }
          >
            <p>Pedido</p>
            <p>{id.toString().padStart(MINIMUN_NUMBERS, '0')}</p>
          </span>
        </div>
        <div
          className="order-status"
          style={ { backgroundColor: `rgb(${statusColor()})` } }
        >
          <p
            data-testid={ `${reduceLength()}delivery-status-${id}` }
          >
            {status}
          </p>
        </div>
        <div className="order-date-price-and-address">
          <p
            data-testid={ `${reduceLength()}order-date-${id}` }
          >
            {date}
          </p>
          <p
            data-testid={ `${reduceLength()}card-price-${id}` }
          >
            {`R$ ${price.replace('.', ',')}`}
          </p>
          { user.userRole(userInfos) === 'seller' && (
            <p data-testid={ `${reduceLength()}card-address-${id}` }>
              {`${address}, ${deliveryNumber}`}
            </p>
          )}
        </div>
      </Link>
    </div>
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
