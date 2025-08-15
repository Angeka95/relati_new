import React, { useState , useEffect, useContext } from 'react';
import PaginatorContext from '../../context/paginatorContext.js';
import { Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Divider from '@mui/material/Divider'; 
import ButtonDownloadXLSCustom from './buttonDownloadXLSCustom.js';
import ButtonDownloadZIPCustom from './buttonDownloadZIPCustom.js';
import '../../App.css';

const ButtonDownloadDecisiones = ({isButtonDownloadEnabled = false, showZipButton = false}) => {

    const [boolButtonDownloadEnabled, setBoolButtonDownloadEnabled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    
    const { datos, datosToExport } = useContext(PaginatorContext);
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Estado del Boton ordenar 
    const toggleButtonDownload = () => {
        setBoolButtonDownloadEnabled(prev => !prev);
    };
  
    return (
      <>
         <div className=" position_relative"> 
            <Button 
                  className="button_function button_download " 
                  startIcon={<FileDownloadOutlinedIcon />} 
                  onClick={toggleButtonDownload}
            >
                  {isMobile ? 'Descargar' : 'Descargar resultados'}
            </Button>
            {boolButtonDownloadEnabled && (
              <div className='container_date_download position_float'>
                { ((datos.length > 0) && (datosToExport !== null)) && 
                      <>
                          <ButtonDownloadXLSCustom
                              stringURL={`${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadresult`}
                              stringParams={`idpro=${datosToExport}`}
                              datosToExport={datosToExport}
                              filename="resultados.xlsx"
                              decorated="false"
                          />
                          {(showZipButton === true) && (
                          <>
                              <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem"}}/>
                              <ButtonDownloadZIPCustom
                                  stringURL={`${process.env.REACT_APP_API_SERVER_DOMAIN}/getdocumentszip`}
                                  stringParams={`providencias_id=${datosToExport}`}
                                  filename="resultados.zip"
                              />
                          </>
                          )}
                      </>
                  }
              </div>
            )}           
        </div>
      </>
    );
    
};

export default ButtonDownloadDecisiones;