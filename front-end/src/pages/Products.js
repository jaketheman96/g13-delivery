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

  const addToCart = (productId) => {
    const product = products.find(({ id }) => id === +productId);
    let cartProduct = { ...product, quantity: 1 };
    const isNewProduct = !cart.some(({ id }) => id === +productId);
    if (isNewProduct) setCart([...cart, cartProduct]);
    else {
      cartProduct = cart.find(({ id }) => id === +productId);
      cartProduct.quantity += 1;
      const cartCopy = [...cart];
      cartCopy.forEach((item) => {
        if (item.id === productId) {
          item.quantity += 1;
        }
      });
      setCart(cartCopy);
    }
  };

  const removeFromCart = (productId) => {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter(({ id }) => id !== +productId);
    setCart(cartCopy);
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

  const handleClick = () => {
    setTotal(0);
  };

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
              cartActions={ { addToCart, removeFromCart } }
            />
          ))
        }
      </div>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        name="total"
        onClick={ handleClick }
      >
        Ver carrinho:
        {' '}
        { convertToBRL.format(total) }

      </button>
    </>
  );
}

export default ProductsPage;
