import axios from 'axios';

const postSuscription = (objNewSuscription) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    }
  };
  const request =  axios.post(`${process.env.REACT_APP_API_SERVER_DOMAIN}/suscripcionboletines`, objNewSuscription, config);
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

const sendBoletin = (objNewSuscription) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    }
  };
  const request =  axios.post(`${process.env.REACT_APP_API_SERVER_DOMAIN}/sendmailboletin`, objNewSuscription, config);
  return request.then(response => { 
    if((response.data.status === 400) || (response.data.status === 401) || (response.data.status === 403) || (response.data.status === 202)) {
      return { "data": response.data.reason, "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": "Datos incorrectos.", "status_info": { "status": response.data.status, "reason": "Datos incorrectos." } };
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
    params: { id: id }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/searchdata`, config);
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
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getboletines`, config);
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
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getboletines`, config);
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

const getBoletinesAniosEspeciales = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getboletines`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.boletines_especiales, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

export default { postSuscription, sendBoletin, getBoletinDetail, getBoletinesByYear, getBoletinesAnios, getBoletinesAniosEspeciales }
