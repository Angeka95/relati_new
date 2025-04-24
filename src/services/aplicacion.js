import axios from 'axios';

const getStatusRelatiAppxMantenimiento = () => {

  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };

  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getappstate`, config);
  return request.then(response => { 
    if((response.data.status !== undefined) || (response.data.status === 401) || (response.data.status === 403)) {
      return { "data": [{ "enabled": true }], "status_info": { "status": response.data.status, "reason": response.data.reason }};
    } else {
      return { "data": [{ "enabled": response.data.enabled }], "status_info": { "status": 200, "reason": "OK" } };
    }
  })
  .catch(error => { 
    let error_response =  {} 
    if(error.response !== undefined ){
      error_response = { "data":[{ "enabled": true }], "status_info": { "status": error.response.data.status, "reason": error.response.data.reason } };
    } else {
      switch (error.code) {
        case "ERR_NETWORK":
          error_response = { "data":[{ "enabled": true }], "status_info": { "status": "ERR_NETWORK", "reason": error.message } };
          break;
        case "ECONNREFUSED":
          error_response = { "data":[{ "enabled": true }], "status_info": { "status": "ECONNREFUSED", "reason": error.message } };
          break;
        case "ECONNRESET":
          error_response = { "data":[{ "enabled": true }], "status_info": { "status": "ECONNRESET", "reason": error.message } };
          break;
        default:
          error_response = { "data":[{ "enabled": true }], "status_info": { "status": "ERR_NETWORK", "reason": error.message } };
      }
    }
    return error_response;
  });

}

export default { getStatusRelatiAppxMantenimiento }