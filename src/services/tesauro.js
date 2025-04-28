import axios from 'axios';
import { ordenarTerminosABCD } from '../helpers/utils.js';

const getTermsByLetter = (letter) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { letter: letter }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/geterms`, config);
  return request.then(response => {
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason } };
    } else {
      if(response.data.terms.hasOwnProperty("result")){
        let termsListTemp = Object.values(response.data.terms.result);
        let termsList = termsListTemp.map(item => {
        if((typeof item.no_term_string === 'string') && ( item.no_term_string.length > 0)){
          return { "nombreReal": item.string, "alias": item.no_term_string.toUpperCase() };
        } else {
          return item.string; 
        }
        });
        let termsListABCD = ordenarTerminosABCD(termsList);
        return { "data": termsListABCD, "status_info": { "status": 200, "reason": "OK" } };
      } else {
        return { "data": [], "status_info": { "status": 200, "reason": "No se encontraron resultados" } };
      }
    }
  }).catch(error => { 
      return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

const getDocsByTerm = (term) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { search: term }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getdocbytesauro`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.data.hits.hits, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

const getDocsByTermAI = (term) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { search: term.toUpperCase() }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getdocbytesauro`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": response.data.data.hits.hits, "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
    return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
}

export default { getTermsByLetter, getDocsByTerm, getDocsByTermAI }
