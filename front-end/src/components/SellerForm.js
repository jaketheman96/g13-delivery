import React from 'react';

function SellerForm() {
  return (
    <section>
      <form>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
          >
            <option value="teste1">teste1</option>
            <option value="teste2">teste2</option>
            <option value="teste3">teste3</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Av. Frio de Janeiro, Bairro lalaland"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Número:
          <input
            id="number"
            name="number"
            type="number"
            placeholder="147"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ (e) => e.preventDefault() }
        >
          Finalizar Pedido
        </button>
      </form>
    </section>
  );
}

export default SellerForm;
