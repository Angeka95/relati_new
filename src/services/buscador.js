import axios from 'axios';

const getSearchData = (string) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { string: string }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/getboletindetail', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

const getSearchQData = (string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { string: string }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/searchqdata', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = [];
      let status_info = {};
      if(response.data.hasOwnProperty('hits')) {
        data = response.data.hits.hits;
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      return { "data": data , "status_info": status_info };
    }
  }).catch(error => {
    console.log("entra a error", error.code);
    return { "data": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
  
}


export default { getSearchData, getSearchQData };