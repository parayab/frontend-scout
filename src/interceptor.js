import fetchIntercept from 'fetch-intercept';

 
export const interceptor = fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    config = config === undefined ? { headers: {} } : {...config, headers: {}}
    config.headers.token=localStorage.getItem("id_token"); // como sea que se deba enviar el header
    config.headers['Content-Type'] = 'application/json';
    const newUrl = `api/${url}`;
    return [newUrl, config];
  },

  response: function (response) {
    // Modify the reponse object
    if (response.status === 401) {
      window.alert('No tienes permiso para acceder a este recurso');
      window.location.replace('/logout');
      // Debe haber una solución mucho más elegante que esta, pero por ahora esto jiji
    }
    return response;
  },
});