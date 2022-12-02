const postFetch = async (data, page) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`http://localhost:3001/${page}`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default postFetch;
