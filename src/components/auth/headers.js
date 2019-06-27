const getHeaders = () => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Bearer', localStorage.getItem('id_token'));
  return headers;
}

export default getHeaders;
