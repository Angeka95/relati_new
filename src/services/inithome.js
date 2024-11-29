import axios from 'axios';

const getHomeData = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get('https://relatoria.jep.gov.co/inithome', config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data":[{ 
                    "providencias":  response.data.providencias, 
                    "boletines": response.data.boletines, 
                }], 
                "status_info": { "status": 200, "reason": "OK" } };
    }
  }).catch(error => { 
      return { "data": [], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
  });
};

export default { getHomeData };