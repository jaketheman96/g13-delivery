import React from 'react';

function ProductCard() {
  return (
    <div className="card" style={ { width: '18em' } }>
      <img src="http://localhost:3001/images/becks_330ml.jpg" className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">
          Some quick example text to build on the card title.

        </p>
      </div>
    </div>
  );
}

export default ProductCard;
