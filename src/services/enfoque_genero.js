import axios from 'axios';

const getEnfoqueGeneroData = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
      'user': process.env.REACT_APP_API_USER,
      'password': process.env.REACT_APP_API_PASS
    },
    params: { }
  };
  const request =  axios.get(`${process.env.REACT_APP_API_SERVER_DOMAIN}/getdocenfoquegenero`, config);
  return request.then(response => { 
    if((typeof response.status === "undefined") || (response.status === 401) || (response.status === 403)) {
      return { "data": [], 
               "status_info": { 
                                "status": response.status, 
                                "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." 
                              }
            };
    } else {
      let data = [];
      let status_info = {};
      if(response.data) {
        data = response.data;
        status_info = { "status": 200, "reason": "La consulta se ha realizado satisfactoriamente." };
        if(data.length === 0){
          status_info = { "status": 200, "reason": "No se encontraron resultados." };
        } 
      } else {
        status_info = { "status": 204, "reason": "La consulta no esta disponible por el momento." } 
      }
      return { "data": data, "status_info": status_info };
    }
  }).catch(error => {
    return { "data": [], 
             "status_info": { 
                                "status": 500, 
                                "reason": "Lo sentimos, algo salió mal. Parece que hubo un problema en nuestro servidor. Estamos trabajando para solucionarlo. Por favor, inténtalo de nuevo más tarde." 
                            }
            };
  });
  
}


export default { getEnfoqueGeneroData };