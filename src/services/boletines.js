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

export default { postSuscription }