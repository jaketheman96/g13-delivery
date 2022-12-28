import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import formatDate from '../utils/formatDate';
import CheckoutTable from './CheckoutTable';
import DeliveryContext from '../context/DeliveryContext';
import user from '../utils/roleValidator';
import putFetch from '../utils/putFetch';
import '../style/OrderDetails.style.css';

const pending = { status: 'Pendente' };
const delivering = { status: 'Em Trânsito' };
const delivered = { status: 'Entregue' };
const preparing = { status: 'Preparando' };

function OrderDetails({ id, seller: { name }, saleDate, status, products, totalPrice }) {
  const MINIMUN_ZEROS = 3;

  const { userInfos } = useContext(DeliveryContext);

  const [isDeliveredButtonDisabled, setIsDeliveredButtonDisabled] = useState(false);
  const [showCustomerButton, setShowCustomerButton] = useState(false);
  const [showSellerButtons, setShowSellerButtons] = useState(false);
  const [isDeliveringBtnDisabled, setIsDeliveringBtnDisabled] = useState(false);
  const [isPreparingBtnDisabled, setIsPreparingBtnDisabled] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');

  const reduceLength = () => {
    if (userInfos) {
      return `${user.userRole(userInfos)}_order_details__element-order-details-`;
    }
  };

  useEffect(() => {
    const buttonsValidator = () => {
      const role = user.userRole(userInfos);
      switch (role) {
      case 'customer':
        setShowCustomerButton(true);
        setShowSellerButtons(false);
        break;
      case 'seller':
        setShowCustomerButton(false);
        setShowSellerButtons(true);
        break;
      default:
        break;
      }
    };
    buttonsValidator();
  }, [setShowCustomerButton, setShowSellerButtons, userInfos]);

  useEffect(() => {
    const statusValidator = () => {
      switch (status) {
      case 'Pendente':
        setOrderStatus(pending.status);
        setStatusColor('209, 189, 12');
        setIsPreparingBtnDisabled(false);
        setIsDeliveringBtnDisabled(true);
        setIsDeliveredButtonDisabled(true);
        break;
      case 'Preparando':
        setOrderStatus(preparing.status);
        setStatusColor('150, 247, 102');
        setIsPreparingBtnDisabled(true);
        setIsDeliveringBtnDisabled(false);
        setIsDeliveredButtonDisabled(true);
        break;
      case 'Em Trânsito':
        setOrderStatus(delivering.status);
        setStatusColor('218, 122, 5');
        setIsPreparingBtnDisabled(true);
        setIsDeliveringBtnDisabled(true);
        setIsDeliveredButtonDisabled(false);
        break;
      case 'Entregue':
        setOrderStatus(delivered.status);
        setStatusColor('40, 217, 220');
        setIsPreparingBtnDisabled(true);
        setIsDeliveringBtnDisabled(true);
        setIsDeliveredButtonDisabled(true);
        break;
      default:
        break;
      }
    };
    statusValidator();
  }, [status]);

  const handleClick = ({ target }) => {
    const input = {
      delivered: async () => {
        setStatusColor('40, 217, 220');
        setOrderStatus(delivered.status);
        setIsDeliveredButtonDisabled(true);
        await putFetch(delivered, 'sales', id);
      },
      preparing: async () => {
        setOrderStatus(preparing.status);
        setStatusColor('150, 247, 102');
        setIsDeliveringBtnDisabled(false);
        setIsPreparingBtnDisabled(true);
        await putFetch(preparing, 'sales', id);
      },
      delivering: async () => {
        setOrderStatus(delivering.status);
        setStatusColor('218, 122, 5');
        setIsDeliveringBtnDisabled(true);
        setIsDeliveredButtonDisabled(false);
        await putFetch(delivering, 'sales', id);
      },
    };
    input[target.name]();
  };

  return (
    <div className="order_details-component">
      <div className="order_details-header">
        <p
          data-testid={ `${reduceLength()}label-order-id` }
        >
          {`Pedido: ${id.toString().padStart(MINIMUN_ZEROS, '0')}`}
        </p>
        <p
          data-testid={ `${reduceLength()}label-seller-name` }
        >
          {`Vend: ${name}`}
        </p>
        <p
          data-testid={ `${reduceLength()}label-order-date` }
        >
          {formatDate(saleDate)}
        </p>
        <p
          data-testid={ `${reduceLength()}label-delivery-status` }
          style={ statusColor
            ? { backgroundColor: `rgb(${statusColor})` }
            : null }
        >
          {orderStatus}
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ handleClick }
          disabled={ isDeliveredButtonDisabled }
          name="delivered"
          hidden={ !showCustomerButton }
        >
          Marcar como entregue
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ handleClick }
          disabled={ isPreparingBtnDisabled }
          name="preparing"
          hidden={ !showSellerButtons }
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ handleClick }
          disabled={ isDeliveringBtnDisabled }
          name="delivering"
          hidden={ !showSellerButtons }
        >
          Saiu para entrega
        </button>
      </div>
      <CheckoutTable infos={ products } totalPrice={ totalPrice } />
    </div>
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
