import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

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
          {!checkoutItens ? <Loading /> : checkoutItens.map((item) => (
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
        <span data-testid="customer_checkout__element-order-total-price">
          teste
        </span>
      </div>

    </div>
  );
}

CheckoutTable.propTypes = {
  checkoutItens: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
