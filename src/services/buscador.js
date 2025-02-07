import axios from 'axios';
import datos_resultados_AI_test from '../data/data_busqueda_AI_test';


const getAllResults = (page, per_page) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: {  }
  };
  
  const request =  axios.get(`https://relatoria.jep.gov.co/getlistdoc?page=${page}&per_page=${per_page}`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = [];
      let status_info = {};
      if(response.data.data.hasOwnProperty('data')) {
        data = response.data.data;
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
    return { "data": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
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
    return { "data": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
  
}

// Este servicio es solo para realizar pruebas con datos de resultados de busqueda
const getSearchQDataTest = () => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/getdepartamento', config);
  return request.then(response => { 
    let status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
    return { "data": datos_resultados_AI_test, "status_info": status_info };
  }).catch(error => { 
    return { "data": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
};

export default { getAllResults, getSearchQData, getSearchQDataTest };