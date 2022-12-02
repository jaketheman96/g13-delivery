const getFetch = async (page) => {
  try {
    const response = await fetch(`http://localhost:3001/${page}`);
    const products = await response.json();
    return products;
  } catch (error) {
    return error;
  }
};

export default getFetch;
