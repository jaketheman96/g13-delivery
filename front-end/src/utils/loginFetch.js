const loginFetch = async (userData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  fetch('http://localhost:3001/login', requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export default loginFetch;
