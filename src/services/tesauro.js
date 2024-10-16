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

  const request = axios.get('https://relatoria.jep.gov.co/geterms', config);
  return request.then(response => { console.log(response.data.terms.result); return response.data.terms.result; });
}

const getTermsByLetter2 = (letter) => {
        const instance = axios.create({
            baseURL: 'https://relatoria.jep.gov.co/',
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
              'user': process.env.REACT_APP_API_USER,
              'password': process.env.REACT_APP_API_PASS
            },
            params: {'letter': letter }
        });
         return instance.get('/geterms')
            .then(response => {
              return Object.values(response.data.terms.result);
            })
}

export default { getTermsByLetter }
