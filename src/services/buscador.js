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
  
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getlistdoc?page=${page}&per_page=${per_page}`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = {};
      let status_info = {};
      if(response.data.hasOwnProperty('data')) {
        data = response.data;
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.data.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      //console.log("Servicio",{ "data": data, "status_info": status_info } );
      return { "data": data, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": {}, "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
  
};

const getAllResultsByFilter = (searchParamsObj) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: {  }
  };
  const searchParamsString = new URLSearchParams(searchParamsObj).toString();
  /*const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchin?string=&procedimiento=&sala_seccion=&anio_providencia=2014|2018&delito=&dpto=DEPARTAMENTO CAUCA|DEPARTAMENTO TOLIMA&macrocaso=&tipo_compareciente=FARC-EP`, config);*/
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchin?${searchParamsString}`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = {};
      let status_info = {};
      if(response.data.hasOwnProperty('data')) {
        data = response.data;
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.data.hits.hits.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      //console.log("Servicio",{ "data": data.data.hits.hits, "status_info": status_info } );
      return { "data": data.data.hits.hits, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": {}, "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
  
};

const getSearchQDataV1 = (string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { string: string }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchqdata`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "filters": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = [];
      let status_info = {};
      let filters = [];
      if(response.data["reponse"].hasOwnProperty('hits')) { 
        data = response.data["reponse"].hits.hits;
        filters = response.data["filter"];
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      return { "data": data, "filters": filters, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": [], "filters": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
  
}

// Este servicio obtiene los resultados de busqueda por buscador normal al AI proveniente de searchqdata
const getSearchQDataV2 = (searchParamsObj) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const searchParamsString = new URLSearchParams(searchParamsObj).toString();
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchquery?${searchParamsString}`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "filters": [], "pagination": [], "download_results": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = [];
      let status_info = {};
      let filters = [];
      let pagination = [];
      let download_results = [];
      if(response.data["reponse"].hasOwnProperty('hits')) { 
        data = response.data["reponse"].hits.hits;
        filters = response.data["filter"];
        download_results = response.data["array_providencia_id"];
        pagination = [
          { "page": response.data["page"], "per_page": response.data["per_page"], "total": response.data["total"], "from": response.data["from"], "to": response.data["to"], "current_page": response.data["current_page"] }
        ];
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      return { "data": data, "filters": filters, "pagination": pagination, "download_results": download_results, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": [], "filters": [], "pagination": [], "download_results": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
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
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getdepartamento`, config);
  return request.then(response => { 
    let status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
    return { "data": datos_resultados_AI_test, "status_info": status_info };
  }).catch(error => { 
    return { "data": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
};

// Este servicio obtiene los resultados de busqueda por buscador normal al AI proveniente de searchqdata filtrados
const getSearchQDataFilterV2 = (searchParamsObj) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const searchParamsString = new URLSearchParams(searchParamsObj).toString();
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchqueryfilter?${searchParamsString}`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "filters": [], "pagination": [], "download_results": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = [];
      let status_info = {};
      let filters = [];
      let pagination = [];
      let download_results = [];
      if(response.data["reponse"].hasOwnProperty('hits')) { 
        data = response.data["reponse"].hits.hits;
        filters = response.data["filter"];
        download_results = response.data["array_providencia_id"];
        pagination = [
          { "page": response.data["page"], "per_page": response.data["per_page"], "total": response.data["total"], "from": response.data["from"], "to": response.data["to"], "current_page": response.data["current_page"] }
        ];
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento.(Elastic Search)." } 
      }
      return { "data": data, "filters": filters, "pagination": pagination, "download_results": download_results, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": [], "filters": [], "pagination": [], "download_results": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
}

// Este servicio  obtiene la lista de opciones de autocompletar para el buscador principal basado en Tesauro relatoria.jep.gov.co/autocompletesearch?search=corte
const getBuscadorListaAutocompletar = (expression) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/autocompletesearch?search=${expression}`, config);
  return request.then(response => { 
    let status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
    return { "data": response.data, "status_info": status_info };
  }).catch(error => { 
    return { "data": [], "status_info": { "status": 500, "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." } };
  });
};

export default { getAllResults, getAllResultsByFilter, getSearchQDataV1, getSearchQDataV2, getSearchQDataFilterV2, getSearchQDataTest, getBuscadorListaAutocompletar };