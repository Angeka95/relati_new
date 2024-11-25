import axios from 'axios';

const postSuscription = (objNewSuscription) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    }
  };
  const request =  axios.post('https://relatoria.jep.gov.co/suscripcionboletines', objNewSuscription, config);
  return request.then(response => { 
    if((response.data.status === 400) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": response.data.reason, "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.response, "status_info": { "status": response.data.status, "reason": response.data.response } };
    }
  }).catch(error => { 
        return { "data": "Lo sentimos, ha ocurrido un error en nuestro servidor. Por favor, intenta nuevamente más tarde.", "status_info": { "status": error.response.status, "reason": error.response.statusText } };
  });
}

const getBoletinDetail = (id) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { 'id': id }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/searchdata', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.boletin, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

const getBoletinesByYear = (anio) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/getboletines', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      const data = response.data.boletines_anio.find( item => item.hasOwnProperty(anio));
      return { "data": (data === undefined)? [] : data[anio], "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

const getBoletinesAnios = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/getboletines', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.boletines, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

export default { postSuscription, getBoletinDetail, getBoletinesByYear, getBoletinesAnios }
