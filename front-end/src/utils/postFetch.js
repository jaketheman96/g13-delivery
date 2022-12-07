const postFetch = async (data, page, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: token,
    },
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
