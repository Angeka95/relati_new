import React, { useState , useEffect } from 'react';
import { getDownloadResultsXLS } from '../services/downloads.js';
import { Alert } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import '../App.css';

export default function ButtonDownloadXLS({ stringURL, stringParams, datosToExport, filename = 'archivo.xlsx', requireService = 'no' }) {

  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", classname: "" });
  
  useEffect(()=> {
      if((stringParams.length > 0) && (requireService === "no" )){
        setDownloadLink(`${stringURL}?${stringParams}`);
      }
  }, [stringParams]);

  const getDownloadLink = async () => {
    setLoading(true);
    setMessage({ message: "", classname: "" });
    
    const newMessage = {};
    
    try {
      const response = await getDownloadResultsXLS(stringURL, stringParams);
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(urlBlob);
    } catch (err) {
      console.error('Error al obtener el archivo de descarga:', err);
      newMessage["message"] = `No se pudo generar el archivo de descarga.`;
      newMessage["classname"] = 'error';
      setMessage(newMessage)
    } finally {
      setLoading(false);
    }
  };  

    if(requireService === "no"){
    
      return (
          <>
            <a className="link_primary vertical_align" href={downloadLink} download={filename} target="_blank" rel="noreferrer">
                <FileDownloadOutlinedIcon/> 
                Descargar reporte en Excel
            </a>
          </>
      );
    } else {
      return (
        <>
        {!downloadLink && (
          <>
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: '10px',
                  height: 'auto',
              }}>
              <a className="link_primary vertical_align" href="#section" onClick={getDownloadLink} disabled={loading}>
                <FileDownloadOutlinedIcon/>
                {loading ? 'Procesando datos...' : 'Obtener reporte en Excel'}
              </a>
              {message.message && 
                  <Alert variant="outlined" severity={message.classname}>
                      {message.message}
                  </Alert> 
              }
              </div>
          </>
        )}
        {downloadLink && (
          <>
            <a className="link_primary vertical_align" href={downloadLink} download={filename}>
                <FileDownloadOutlinedIcon/> 
                Descargar reporte en Excel
            </a>
          </>
        )}
        </>
      );
    }
};