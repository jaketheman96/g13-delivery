const fetchProducts = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch('http://localhost:3001/products', requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchProducts;
