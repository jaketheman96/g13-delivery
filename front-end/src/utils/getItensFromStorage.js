function getItensFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export default getItensFromStorage;
