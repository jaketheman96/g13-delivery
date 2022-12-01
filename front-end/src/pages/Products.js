import React from 'react';
import products from '../backend_mock/products.mock';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  return (
    <>
      <Navbar />
      <br />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          products.map((product) => (
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
    </>
  );
}

export default ProductsPage;
