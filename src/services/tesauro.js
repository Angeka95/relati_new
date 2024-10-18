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

export default { getTermsByLetter }
