import React, { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

const PRICE_ZERO = 0;

export default function CheckoutTable() {
  const {
    totalCartPrice,
    cart,
    setCart,
    setTotalCartPrice,
  } = useContext(DeliveryContext);

  const subtractTotal = (totalPrice, value) => {
    const total = totalPrice - Number(value);
    if (total < PRICE_ZERO) return setTotalCartPrice(0);
    setTotalCartPrice(total);
  };

  const handleRemoveBtn = ({ target }) => {
    const arrayFiltered = cart.filter((product) => Number(target.id) !== product.id);
    setCart(arrayFiltered);
    localStorage.setItem('cart', JSON.stringify(arrayFiltered));
    subtractTotal(totalCartPrice, target.value);
  };

  return (
    <div>
      <h3>Finalizar Pedido</h3>
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
            <th>
              Remover Item
            </th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {item.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {item.price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(item.price * item.quantity).toFixed(2).replace('.', ',')}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ handleRemoveBtn }
                  id={ item.id }
                  value={ (item.price * item.quantity).toFixed(2) }
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
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
        <span data-testid="customer_checkout__element-order-total-price">
          {`R$${totalCartPrice.toFixed(2).replace('.', ',')}`}
        </span>
      </div>

    </div>
  );
}
