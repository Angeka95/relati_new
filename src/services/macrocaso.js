import axios from 'axios';

const getMacrocasos = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getmacrocaso`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
};


// getCasosXTramite recibe el tipo de caso y el tipo de tramite si es sala o tribunal
const getCasosXTramite = (caso, tipoTramite) => {

  console.log("caso", caso);
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/casosalatramite?tipo=${tipoTramite}&caso=${caso}`, config);
  return request.then(response => {
    console.log("response", response.data); 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      let data = [];
      /*if(response.data.length > 0 ){
        data = response.data.filter(item => ((item.casopro[0].caso === caso) && (item.detalle_caso !== null)));
      }*/
      return { "data": response.data, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
};

const getBoletinesMacrocaso = (macrocaso) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { macrocaso: macrocaso }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getboletinesmacrocaso`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.boletines_macrocaso, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });

};

const getDetailedMacrocasos = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/detailsmacrocasos`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });

};

const getHitosMacrocasos = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/itosmacrocasos`, config);
  return request.then(response => {
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });

};

const getFilterCasoSalaTribunal = (caso, tipoTramite, tiposDecisiones) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const stringTiposDecisiones = tiposDecisiones.map(encodeURIComponent).join(',');
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/filtercaso?salatramite=${tipoTramite}&caso=${caso}&tipo=${stringTiposDecisiones}`, config);
  return request.then(response => {
    if((response.status !== 200) || (response.status === 401) || (response.status === 403)) {
      return { "data": [], "status_info": { "status": response.status, "reason": response.statusText }};
    } else {
      return { "data": response.data, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });

};

export default { getMacrocasos, getCasosXTramite, getBoletinesMacrocaso, getDetailedMacrocasos, getHitosMacrocasos, getFilterCasoSalaTribunal }

