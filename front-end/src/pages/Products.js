import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import DeliveryContext from '../context/DeliveryContext';
import convertToBRL from '../utils/convertToBRL';
import fetchProducts from '../utils/fetchProducts';

function ProductsPage() {
  const { setUserInfos } = useContext(DeliveryContext);
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);

  const handleQuantity = (productId, quantity) => {
    const product = products.find(({ id }) => id === +productId);
    const cartProduct = { ...product, quantity: 1 };
    const isNewProduct = !cart.some(({ id }) => id === +productId);
    if (isNewProduct) {
      const newCart = [...cart, cartProduct];
      const storedCart = JSON.stringify(newCart);
      localStorage.setItem('cart', storedCart);
      setCart(newCart);
    } else {
      const newCart = [...cart];
      for (let i = 0; i < newCart.length; i += 1) {
        if (newCart[i].id === +productId) {
          newCart[i].quantity = quantity;
        }
      }
      const storedCart = JSON.stringify(newCart);
      localStorage.setItem('cart', storedCart);
      setCart(newCart);
    }
  };

  useEffect(() => {
    const startCart = () => {
      let newCart = [];
      for (let i = 0; i < products.length; i += 1) {
        const product = products[i];
        const cartProduct = {
          ...product,
          quantity: 0,
        };
        newCart = [...newCart, cartProduct];
      }
      const storedCart = JSON.stringify(newCart);
      localStorage.setItem('cart', storedCart);
      setCart(newCart);
    };
    if (products) {
      startCart();
    }
  }, [products]);

  useEffect(() => {
    const getItensFromStorage = () => {
      const userData = localStorage.getItem('userInfo');
      const restoredCart = localStorage.getItem('cart');
      if (restoredCart) {
        setCart(JSON.parse(restoredCart));
      }
      setUserInfos(JSON.parse(userData));
    };

    async function getProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    getProducts();
    getItensFromStorage();
  }, [setUserInfos]);

  useEffect(() => {
    const handleTotal = () => {
      let totalValue = 0;
      for (let i = 0; i < cart.length; i += 1) {
        totalValue += Number(cart[i].price * cart[i].quantity);
      }
      setTotal(totalValue);
    };
    handleTotal();
  }, [cart]);

  return (
    <>
      <Navbar />
      <br />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          !productsInfo ? <Loading /> : productsInfo.map((product) => (

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
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver carrinho:
        {' '}
        { convertToBRL.format(total) }

      </button>
    </>
  );
}

export default ProductsPage;
