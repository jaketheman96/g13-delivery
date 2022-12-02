import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import DeliveryContext from '../context/DeliveryContext';
import convertToBRL from '../utils/convertToBRL';
import fetchProducts from '../utils/fetchProducts';

function ProductsPage() {
  const { setUserInfos } = useContext(DeliveryContext);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);

  const handleQuantity = (productId, quantity) => {
    const product = products.find(({ id }) => id === +productId);
    const cartProduct = { ...product, quantity: 1 };
    const isNewProduct = !cart.some(({ id }) => id === +productId);
    if (isNewProduct) setCart([...cart, cartProduct]);
    else {
      const newCart = [...cart];
      for (let i = 0; i < newCart.length; i += 1) {
        if (newCart[i].id === +productId) {
          newCart[i].quantity = quantity;
        }
      }
      setCart(newCart);
    }
  };

  useEffect(() => {
    const getItensFromStorage = () => {
      const userData = localStorage.getItem('userInfo');
      setUserInfos(JSON.parse(userData));
    };
    async function getProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }

    getProducts();
    getItensFromStorage();
  }, [setUserInfos]);

  const order = () => {
    // setTotal(0);
  };

  const handleTotal = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i += 1) {
      totalVal += Number(cart[i].price * cart[i].quantity);
    }
    setTotal(totalVal);
  };

  useEffect(() => {
    handleTotal();
  }, [cart]);

  return (
    <>
      <Navbar />
      <br />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          products && products.map((product) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              image={ product.urlImage }
              price={ product.price.replace('.', ',') }
              name={ product.name }
              handleQuantity={ handleQuantity }
            />
          ))
        }
      </div>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        name="total"
        onClick={ order }
      >
        Ver carrinho:
        {' '}
        { convertToBRL.format(total) }

      </button>
    </>
  );
}

export default ProductsPage;
