import PropTypes from 'prop-types';
import { useState } from 'react';

// let render = 0;
function ProductCard({ id, image, name, price, handleQuantity }) {
  const [inputValue, setInputValue] = useState(0);

  const handleClick = (event) => {
    const operation = event.target.name;
    if (inputValue === 0 && operation === 'btn-rm') {
      setInputValue(0);
    } else {
      if (operation === 'btn-rm') {
        setInputValue((prevtState) => prevtState - 1);
        handleQuantity(event.target.id, inputValue - 1);
      }
      if (operation === 'btn-add') {
        setInputValue((prevState) => prevState + 1);
        handleQuantity(event.target.id, inputValue + 1);
      }
    }
  };

  // useEffect(() => {
  //   const getItensFromStorage = () => {
  //     let restoredInputs = localStorage.getItem('inputs');
  //     restoredInputs = JSON.parse(restoredInputs);
  //     if (restoredInputs) {
  //       const input = restoredInputs[render];
  //       setInputValue(input.quantity);
  //       render += 1;
  //     }
  //   };
  //   getItensFromStorage();
  // }, []);

  const handleChange = (event) => {
    const quantity = Number(event.target.value);
    if (Number.isNaN(quantity)) {
      setInputValue(1);
    } else {
      setInputValue(Number(event.target.value));
      handleQuantity(event.target.id, Number(event.target.value));
    }
  };

  return (
    <div className="card" style={ { width: '10em' } }>
      <img
        src={ `${image}` }
        className="card-img-top"
        style={ { width: '3em' } }
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
        <span>
          R$
        </span>
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          { price || 'Product Price'}
        </span>
        <br />
        <button
          type="button"
          id={ id }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          name="btn-rm"
          onClick={ handleClick }
        >
          -

        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          id={ id }
          style={ { width: '2em' } }
          type="text"
          value={ inputValue }
          onChange={ handleChange }
        />
        <button
          type="button"
          id={ id }
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
  handleQuantity: PropTypes.func.isRequired,
};
