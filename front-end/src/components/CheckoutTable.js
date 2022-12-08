import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

const PRICE_ZERO = 0;

export default function CheckoutTable({ infos, totalPrice }) {
  const {
    totalCartPrice,
    cart,
    setCart,
    setTotalCartPrice,
  } = useContext(DeliveryContext);

  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  const { path } = useRouteMatch();

  const subtractTotal = (total, value) => {
    const operation = total - Number(value);
    if (operation < PRICE_ZERO) return setTotalCartPrice(0);
    setTotalCartPrice(operation);
  };

  const handleRemoveBtn = ({ target }) => {
    const arrayFiltered = cart.filter((product) => Number(target.id) !== product.id);
    setCart(arrayFiltered);
    localStorage.setItem('cart', JSON.stringify(arrayFiltered));
    subtractTotal(totalCartPrice, target.value);
  };

  useEffect(() => {
    const pathValidator = () => {
      if (path.includes('/checkout')) {
        return setIsCheckoutPage(true);
      }
      return setIsCheckoutPage(false);
    };
    pathValidator();
  }, [path]);

  const handleConditionalRender = () => {
    if (isCheckoutPage) return 'checkout';
    return 'order_details';
  };

  return (
    <section>
      {isCheckoutPage && <h3>Finalizar Pedido</h3>}
      <table>
        <thead>
          <tr>
            <th>
              Item
            </th>
            <th>
              Descrição
            </th>
            <th>
              Quantidade
            </th>
            <th>
              Valor Unitário
            </th>
            <th>
              Sub-total
            </th>
            {isCheckoutPage && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {infos && infos.map((item, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_${handleConditionalRender()}__
                element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_${handleConditionalRender()}__
                  element-order-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `customer_${handleConditionalRender()}
                  __element-order-table-quantity-${index}`
                }
              >
                {item.SaleProduct.quantity}
              </td>
              <td
                data-testid={
                  `customer_${handleConditionalRender()}
                  __element-order-table-unit-price-${index}`
                }
              >
                {item.price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_${handleConditionalRender()}
                  __element-order-table-sub-total-${index}`
                }
              >
                {(item.price * item.SaleProduct.quantity).toFixed(2).replace('.', ',')}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ handleRemoveBtn }
                  id={ item.id }
                  value={ (item.price * item.quantity).toFixed(2) }
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  hidden={ !isCheckoutPage }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Total:
        &nbsp;
        <span
          data-testid={ `customer_${handleConditionalRender()}
          __element-order-total-price` }
        >
          {isCheckoutPage && `R$${totalCartPrice.toFixed(2).replace('.', ',')}`}
          {!isCheckoutPage && `R$${totalPrice}`}
        </span>
      </div>
    </section>
  );
}

CheckoutTable.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    SaleProduct: PropTypes.shape({ quantity: PropTypes.number.isRequired }),
  })).isRequired,
  totalPrice: PropTypes.string.isRequired,
};
