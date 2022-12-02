import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import DeliveryContext from '../context/DeliveryContext';
import getFetch from '../utils/getFetch';
import Loading from '../components/Loading';

function ProductsPage() {
  const {
    productsInfo,
    setProductsInfo,
  } = useContext(DeliveryContext);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getFetch('products');
      return setProductsInfo(result);
    };
    getProducts();
  }, [setProductsInfo]);

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
            />
          ))
        }
      </div>
    </>
  );
}

export default ProductsPage;
