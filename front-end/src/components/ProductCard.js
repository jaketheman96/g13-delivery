import PropTypes from 'prop-types';
import { useState } from 'react';

function ProductCard({ id, image, name, price }) {
  const [inputValue, setInputVale] = useState(0);

  const handleClick = (event) => {
    const operation = event.target.name;
    if (inputValue === 0 && operation === 'btn-rm') setInputVale(0);
    else {
      return operation === 'btn-rm' ? setInputVale(inputValue - 1)
        : setInputVale(inputValue + 1);
    }
  };

  const handleChange = (event) => {
    const quantity = Number(event.target.value);
    if (Number.isNaN(quantity)) setInputVale(0);
    else setInputVale(Number(event.target.value));
  };

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
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          name="btn-rm"
          onClick={ handleClick }
        >
          -

        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          style={ { width: '2em' } }
          type="text"
          value={ inputValue }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          name="btn-add"
          onClick={ handleClick }
        >
          +

        </button>
      </div>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
