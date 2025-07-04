import axios from 'axios';

const getAllResultsBusquedaAV = (searchParamsObj) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: {  }
  };
  let newSearchParamsObj = Object.assign({}, searchParamsObj);
  delete newSearchParamsObj.advanced_search;
  const searchParamsString = new URLSearchParams(newSearchParamsObj).toString();
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchadv?${searchParamsString}`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "filters": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = {};
      let status_info = {};
      let filters = [];
      if(response.data.reponse.hasOwnProperty('hits')) {
        data = response.data.reponse.hits;
        filters = response.data["filter"];
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.hits.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      return { "data": data.hits, "filters": filters, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": {}, "filters": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
  
};


export default { getAllResultsBusquedaAV };