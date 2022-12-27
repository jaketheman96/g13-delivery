import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import user from '../utils/roleValidator';

const PRICE_ZERO = 0;

export default function CheckoutTable({ infos, totalPrice }) {
  const {
    userInfos,
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

  const checkoutCondition = () => {
    if (isCheckoutPage) return 'checkout';
    return 'order_details';
  };

  const roleValidation = () => {
    if (userInfos) {
      const role = user.userRole(userInfos);
      return role;
    }
  };

  const reduceLength = () => {
    const isCheckout = checkoutCondition();
    return `${roleValidation()}_${isCheckout}__element-order`;
  };

  return (
    <section className="checkout-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {isCheckoutPage && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {infos && infos.map((item, index) => (
            <tr key={ index }>
              <td
                data-testid={ `${reduceLength()}-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `${reduceLength()}-table-name-${index}` }
              >
                {item.name}
              </td>
              <td
                data-testid={ `${reduceLength()}-table-quantity-${index}` }
              >
                {item.SaleProduct.quantity}
              </td>
              <td
                data-testid={ `${reduceLength()}-table-unit-price-${index}` }
              >
                {item.price.replace('.', ',')}
              </td>
              <td
                data-testid={ `${reduceLength()}-table-sub-total-${index}` }
              >
                {(item.price * item.SaleProduct.quantity).toFixed(2).replace('.', ',')}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ handleRemoveBtn }
                  id={ item.id }
                  value={ (item.price * item.SaleProduct.quantity).toFixed(2) }
                  data-testid={ `${reduceLength()}table-remove-${index}` }
                  hidden={ !isCheckoutPage }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">
        <p
          data-testid={ `${reduceLength()}-total-price` }
        >
          {isCheckoutPage && `Total: R$ ${totalCartPrice.toFixed(2).replace('.', ',')}`}
          {!isCheckoutPage && `Total: R$ ${totalPrice.replace('.', ',')}`}
        </p>
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
