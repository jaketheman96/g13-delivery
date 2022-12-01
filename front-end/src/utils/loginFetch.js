const loginFetch = async (userData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  try {
    const response = await fetch('http://localhost:3001/login', requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default loginFetch;
