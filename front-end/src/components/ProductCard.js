import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ id, image, name, price }) {
  return (
    <div className="card" style={ { width: '20em' } }>
      <img
        src={ `${image}` }
        className="card-img-top"
        alt="product"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <div className="card-body">
        <p
          className="card-text"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name || 'Product Name' }
        </p>
        <p data-testid={ `customer_products__element-card-price-${id}` }>
          { price || 'Product Price'}
        </p>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id} ` }
        >
          -

        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          style={ { width: '2em' } }
          type="text"
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id} ` }
        >
          +

        </button>
      </div>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
