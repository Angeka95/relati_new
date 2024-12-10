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
      //console.log("entra a hits", response.data.hasOwn('hits'));
      let data = (response.data.hasOwnProperty('hits')) ? response.data.hits.hits : [] ;
      return { "data": data , "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => {
    //console.log("entra a error");
    return { "data": [], "status_info": { "status": 500, "reason": error.code } };
  });
  
}


export default { getSearchData, getSearchQData };