const putFetch = async (data, page, id) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`http://localhost:3001/${page}/${id}`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export default putFetch;
