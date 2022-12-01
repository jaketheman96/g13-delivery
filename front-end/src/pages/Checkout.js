import React from 'react';
import checkoutItens from '../backend_mock/checkout.mock';
import Navbar from '../components/Navbar';

function CheckoutPage() {
  console.log('CheckoutPage initialized ')
  return (
    <>
    <Navbar />
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
          </tr>
        </thead>
        <tbody>
          {checkoutItens.map(itens => (
            <tr key={`element-order-table-name-${itens.id}`}>
              <td data-testid={`customer_checkout__element-order-table-item-number-${itens.id}`}>
                {itens.id}
              </td>
              <td data-testid={`customer_checkout__element-order-table-name-${itens.name}`}>
                {itens.name}
              </td>
              <td data-testid={`customer_checkout__element-order-table-quantity-${itens.quantity}`}>
                {itens.quantity}
              </td>
              <td data-testid={`customer_checkout__element-order-table-unit-price-${itens.unitPrice}`}>
                {itens.unitPrice}
              </td>
              <td data-testid={`customer_checkout__element-order-table-sub-total-${itens.subTotal}`}>
                {itens.subTotal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );}

export default CheckoutPage;