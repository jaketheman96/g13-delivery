import React from 'react';
import PropTypes from 'prop-types';

export default function CheckoutTable({ checkoutItens }) {
  return (
    <div>
      <h1>Finalizar Pedido</h1>
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
          {checkoutItens.cart.map((item) => (
            <tr key={ `element-order-table-name-${item.id}` }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${item.id}`
                }
              >
                {item.id}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${item.name}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${item.quantity}`
                }
              >
                {item.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${item.unitPrice}`
                }
              >
                {item.unitPrice}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${item.subTotal}`
                }
              >
                {item.subTotal}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => { console.log(item); } }
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
        <span>
          {checkoutItens.totalPrice}
        </span>
      </div>

    </div>
  );
}

CheckoutTable.propTypes = {
  checkoutItens: PropTypes.shape({
    cart: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      productId: PropTypes.number,
      name: PropTypes.string,
      unitPrice: PropTypes.string,
      subTotal: PropTypes.string,
      quantity: PropTypes.number,
    })).isRequired,
    totalPrice: PropTypes.string.isRequired,
  }).isRequired,
};
