const deleteFetch = async (id, page, token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    const response = await fetch(`http://localhost:3001/${page}/${id}`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default deleteFetch;
