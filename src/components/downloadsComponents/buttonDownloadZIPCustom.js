import React, { useState , useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDownloadResultsZIP } from '../../services/downloads.js';
import { Modal, Box, Button, FormControlLabel, Checkbox,FormGroup,  } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LinearWithValueLabel from '../linearProgress.js';
import '../../App.css';

export default function ButtonDownloadZIPCustom({ stringURL, stringParams, filename = 'archivo.zip' }) {

    const [downloadLink, setDownloadLink] = useState(null);
    const [prepareDownload, setPrepareDownload] = useState(false);
    const [message, setMessage] = useState({ message: "", classname: "" });
        
    // Modal 
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

    // Al ejcutar el boton de descargar reporte, desaparece el formulario y muestra el contenedor de descarga
    const handlePrepareDownload = (event) => {
        event.preventDefault();
        setPrepareDownload(true);
        document.querySelector('.BDZ-download_container').classList.remove('hide');
        document.querySelector('.BDZ-form_container').classList.add('hide');
        
    };
     
    const getDownloadLink = async () => {
      setMessage({ message: "", classname: "" });
      
      const newMessage = {};
      
      try {
        const response = await getDownloadResultsZIP(stringURL, stringParams);
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        setDownloadLink(urlBlob);
      } catch (err) {
        console.error('Error al obtener el archivo de descarga:', err);
        newMessage["message"] = `No se pudo generar el archivo de descarga.`;
        newMessage["classname"] = 'error';
        setMessage(newMessage);
      } finally {
        setPrepareDownload(false);
      }
  };  

    useEffect(() => {
        if(prepareDownload) {
          getDownloadLink();
        }
    }
    , [prepareDownload]);
    
    useEffect(() => {
        if (openModal) {
            setDownloadLink(`${stringURL}?${stringParams}`);
        } else {
            setDownloadLink(null);
        }
    }, [openModal, stringParams]);
  
    return (
      <>
        <style jsx>
        {`
          .BDZ-main_container {
            position: relative;
          }
          .BDZ-form_container{
            display: block;
            opacity: 100%;
          }
          .BDZ-form_container.hide {
            opacity: 0;
          }
          .BDZ-download_container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                width: 100%;
                height: 100%;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
          }
          .BDZ-download_container.hide {
            display: none;
          }
          .BDZ-preloader {
            display: none;
          }
          .BDZ-preloader.show {
            display: block;
            width: inherit;
            height: auto;
          }
          .BDZ-download.show {
            display: show;
          }
          .BDZ-download.hide {
            display: none;
          }
        `}
        </style>
        <button
          type="button"
          className=" vertical_align cursor_pointer items_sorted"
          onClick={handleOpenModal}
          style={{ background: 'none', border: 'none' }}
        >
        Exportar decisiones en ZIP
        </button>
        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="display_ flex justify_center margin_none">
            <Box className="modal_box justify-center modal_spacing scroll_modal">
              <div className="header_select f_wrap margin_top_m_ margin_bottom_s justify_center_mobile">
                <Button
                  onClick={handleCloseModal}
                  className="modal_close_button display_none_desktop"
                >
                <CloseIcon />
                </Button>
                <h3 className="text_center margin_top_s">
                 Exportar decisiones en formato ZIP
                </h3>
                <div className="display_flex">
                  <Button
                    onClick={handleCloseModal}
                    className="modal_close_button display_none_mobile justify_end"
                  >
                  <CloseIcon />
                  </Button>
                </div>
              </div>
              <div className='BDZ-main_container'>
                <div className='BDZ-download_container hide'>
                   <>
                    <div className="BDZ-preloader show">
                      <LinearWithValueLabel  
                        processingMessages={["Procesando datos...", "Generando archivo de descarga, espere por favor..."]}>
                      </LinearWithValueLabel> 
                    </div>
                    <Button 
                        className="BDZ-download hide text_capitalize button_primary margin_bottom_s" 
                        href={downloadLink} 
                        download={filename} 
                        target="_blank" 
                        rel="noreferrer"
                        >
                        <FileDownloadOutlinedIcon />
                        Descargar ZIP
                    </Button>
                    <a className="link_primary vertical_align" href={void(0)} onClick={handleCloseModal} rel="noreferrer">
                      Cerrar 
                    </a>
                   </> 
                </div>
                <div className='BDZ-form_container'>
                  <div className="header_select margin_bottom_s margin_top_m">
                    <div className="width_100_mobile justify_center_mobile">
                      <Button className="text_capitalize button_primary margin_bottom_s" href={void(0)} onClick={handlePrepareDownload} target="_self" rel="noreferrer">
                        <FileDownloadOutlinedIcon />
                        Descargar reporte
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </Modal>
      </>
    );
    
};