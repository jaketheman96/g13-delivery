import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import formatDate from '../utils/formatDate';
import CheckoutTable from './CheckoutTable';

function OrderDetails({ id, seller: { name }, saleDate, status, products, totalPrice }) {
  const MINIMUN_ZEROS = 3;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const reduceLength = () => 'customer_order_details__element-order-details-';

  useEffect(() => {
    const statusValidator = () => {
      if (status === 'Em Trânsito') return setIsButtonDisabled(false);
      return setIsButtonDisabled(true);
    };
    statusValidator();
  }, [setIsButtonDisabled, status]);

  return (
    <section>
      <div
        style={ { display: 'flex' } }
      >
        <h4
          data-testid={ `${reduceLength()}label-order-id` }
        >
          {`Pedido: ${id.toString().padStart(MINIMUN_ZEROS, '0')}`}
        </h4>
        <h4
          data-testid={ `${reduceLength()}label-seller-name` }
        >
          {name}
        </h4>
        <h4
          data-testid={ `${reduceLength()}label-order-date` }
        >
          {formatDate(saleDate)}
        </h4>
        <h4
          data-testid={ `${reduceLength()}label-delivery-status` }
        >
          {status}
        </h4>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => setIsButtonDisabled(true) }
          disabled={ isButtonDisabled }
        >
          Marcar como entregue
        </button>
      </div>
      <div>
        <CheckoutTable infos={ products } totalPrice={ totalPrice } />
      </div>
    </section>
  );
}

OrderDetails.propTypes = {
  id: Proptypes.number.isRequired,
  seller: Proptypes.shape({ name: Proptypes.string.isRequired }).isRequired,
  saleDate: Proptypes.string.isRequired,
  status: Proptypes.string.isRequired,
  products: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.number.isRequired,
    name: Proptypes.string.isRequired,
    price: Proptypes.string.isRequired,
    urlImage: Proptypes.string.isRequired,
  })).isRequired,
  totalPrice: Proptypes.string.isRequired,
};

export default OrderDetails;
