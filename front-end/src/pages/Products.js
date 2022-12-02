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
    setTotal();
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
              image={ product.url_image }
              price={ product.price.replace('.', ',') }
              name={ product.name }
            />
          ))
        }
      </div>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        name="btn-add"
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
