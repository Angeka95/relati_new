import axios from 'axios';

const getTermsByLetter = (letter) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { 'letter': letter }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/geterms', config);
  return request.then(response => response.data )
}

const getDocsByTerm = (term) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { 'search': term }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/getdocbytesauro', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.data.hits.hits, "status_info": { "status": 200, "reason": "OK" } };
    }
  })
}

export default { getTermsByLetter, getDocsByTerm }
