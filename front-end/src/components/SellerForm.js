import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import getFetch from '../utils/getFetch';
import postFetch from '../utils/postFetch';

function SellerForm() {
  const { cart, userInfos, totalCartPrice, setCart } = useContext(DeliveryContext);
  const [sellerInfos, setSellerInfos] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);
  const [seller, setSeller] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getSellers = async () => {
      const response = await getFetch('users/sellers');
      setSellerInfos(response);
    };

    getSellers();
  }, []);

  const requestBody = () => ({
    userId: userInfos.id,
    sellerId: Number(seller),
    products: cart.map((itens) => ({
      id: itens.id,
      quantity: itens.quantity,
      price: itens.price,
    })),
    deliveryAddress,
    deliveryNumber,
    totalPrice: totalCartPrice,
  });

  const handleClick = async (event) => {
    event.preventDefault();
    const body = requestBody();
    const response = await postFetch(body, 'sales', userInfos.token);
    localStorage.removeItem('cart');
    setCart([]);
    history.push(`/customer/orders/${response.id}`);
    return response;
  };

  const handleChange = ({ target }) => {
    const input = target.name;
    const options = {
      address: () => setDeliveryAddress(target.value),
      number: () => setDeliveryNumber(target.value),
      seller: () => setSeller(target.value),
    };
    return options[input]();
  };

  return (
    <section>
      <form>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
            onChange={ handleChange }
          >
            <option>-----</option>
            {sellerInfos.map((s) => (
              <option
                key={ s.id }
                value={ s.id }
              >
                {s.name}
              </option>
            ))}
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
            onChange={ handleChange }
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
            onChange={ handleChange }
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleClick }
        >
          Finalizar Pedido
        </button>
      </form>
    </section>
  );
}

export default SellerForm;
