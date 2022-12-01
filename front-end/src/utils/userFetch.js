const loginFetch = async (userData, page) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  try {
    const response = await fetch(`http://localhost:3001/${page}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default loginFetch;
