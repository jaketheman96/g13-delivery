const registerFetch = async (userData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch('http://localhost:3001/register', requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  };
  
  export default registerFetch;
  