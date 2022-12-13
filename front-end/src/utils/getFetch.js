const getFetch = async (page, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    const response = await fetch(`http://localhost:3001/${page}`, requestOptions);
    const products = await response.json();
    return products;
  } catch (error) {
    return error;
  }
};

export default getFetch;
