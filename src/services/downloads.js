import axios from 'axios';

const getDownloadResultsXLS = async ( stringURL, stringParams ) => {
  try {
    const config = {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
          'user': process.env.REACT_APP_API_USER,
          'password': process.env.REACT_APP_API_PASS
        },
        params: { },
        responseType: 'blob'
      };
    const stringQuery = `${stringURL}?${stringParams}`;
    const response =  await axios.get(stringQuery, config);   
    return response;
  } catch(error){ 
    console.error('Error al obtener el archivo de descarga:', error);
    throw error; 
  };
}

export default getDownloadResultsXLS;