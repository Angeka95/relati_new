import React, { useState , useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDownloadResultsXLS } from '../services/downloads.js';
import { getDownloadResultsZIP } from '../services/downloads.js';
import { Modal, Box, Button, FormControlLabel, Checkbox,FormGroup,  } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LinearWithValueLabel from './linearProgress.js';
import '../App.css';

export default function ButtonDownloadZIPCustom({ stringURL, stringParams, datosToExport, filename = 'archivo.xlsx'}) {

    const [downloadLink, setDownloadLink] = useState(null);
    
    const optionsExcel = [
        { label: "Accionado / vinculado", value: "accionado_vinculado" },
        { label: "Análisis caso concreto", value: "analisis_caso_concreto" },
        { label: "Año de los hechos", value: "anio_hechos" },
        { label: "Autor", value: "autor" },
        { label: "Compareciente", value: "compareciente" },
        { label: "Conclusión", value: "conclusion_resuelve" },
        { label: "Delito", value: "delito" },
        { label: "Departamento", value: "departamento" },
        { label: "Derecho fundamental", value: "derecho_fundamental" },
        { label: "Enfoque diferencial", value: "enfoque" },
        { label: "Enlace", value: "hipervinculo" },
        { label: "Expediente", value: "expediente" },
        { label: "Fecha de providencia", value: "fecha_documento" },
        { label: "Hechos / Antecedentes", value: "hechos_antecedentes" },
        { label: "Macrocaso asociado", value: "macrocaso" },
        { label: "Municipio", value: "municipio" },
        { label: "Nombre", value: "nombre_providencia" },
        { label: "Palabras clave", value: "palabras_clave" },
        { label: "Problema jurídico", value: "problema_juridico" },
        { label: "Procedimiento", value: "procedimiento" },
        { label: "Radicado", value: "radicado_documento" },
        { label: "Reglas jurídicas", value: "reglas_juridicas" },
        { label: "Resuelve", value: "resuelve" },
        { label: "Sala / Sección", value: "sala_seccion" },
        { label: "Síntesis", value: "sintesis" },
        { label: "Tipo de compareciente", value: "tipo_compareciente" },
        { label: "Tipo de documento", value: "tipo_documento" }
    ];
    
    const initialState = optionsExcel.reduce((acc, option) => { acc[option.label] = true; return acc; }, {});
    
    const [checkedState, setCheckedState] = useState(initialState);
    const [prepareDownload, setPrepareDownload] = useState(false);
        
    // Modal Excel
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    
    const [checkedAll, setCheckedAll] = useState(true); 
    
    const handleChangeSelectAll = (event) => {
        
        const { checked } = event.target;
        setCheckedAll(checked); 
          
        setCheckedState((prevState) => {
          const newState = {};
          optionsExcel.forEach((option) => {
            newState[option.label] = checked; 
          });
          return newState; 
        });
        
    };
    
    const handleChangeCheck = (event) => {
        const { name, checked } = event.target;
       
        setCheckedState((prevState) => ({
          ...prevState,
          [name]: checked, 
        }));
    };
    
    // Al ejcutar el boton de descargar reporte, desaparece el formulario y muestra el contenedor de descarga
    const handlePrepareDownload = (event) => {
        event.preventDefault();
        setPrepareDownload(true);
        document.querySelector('.BDZ-download_container').classList.remove('hide');
        document.querySelector('.BDZ-form_container').classList.add('hide');
    };
    
    useEffect(() => {
        if(prepareDownload) {
          
        }
    }
    , [prepareDownload]);
    
    useEffect(() => {
        if (openModal) {
            
            const selectedOptions = optionsExcel.filter(option => checkedState[option.label]);
            const predeterminatedValues = ["tipo_documento", "fecha_documento", "sala_seccion", "enlace", "palabras_clave", "conclusion", "nombre_providencia"];
            const priorityValues = ["tipo_documento", "fecha_documento", "sala_seccion", "enlace", "palabras_clave", "conclusion", "nombre_providencia"];
            
            let selectedValues = [];
            
            if((selectedOptions.length > 0) && (selectedOptions.length < optionsExcel.length)){
              selectedValues = selectedOptions.map(option => option.value);
              
              // Ensure predeterminatedValues are included in selectedValues
              predeterminatedValues.forEach((val) => {
                  if (!selectedValues.includes(val)) {
                      selectedValues.push(val);
                  }
              });
            
            } else if(selectedOptions.length === optionsExcel.length){
                selectedValues = optionsExcel.map(option => option.value);
                // Ensure predeterminatedValues are included in selectedValues
                predeterminatedValues.forEach((option) => {
                    if (!selectedValues.includes(option)) {
                        selectedValues.push(option);
                    }
                });
            } else if(selectedOptions.length === 0){
                selectedValues = predeterminatedValues;
            }
          
            const newSelectedValues = priorityValues.concat(selectedValues.filter(option => !priorityValues.includes(option)));
            
            const stringColumns = `columns=${newSelectedValues.join(',')}`;
            setDownloadLink(`${stringURL}?${stringParams}&${stringColumns}`);
        } else {
            setDownloadLink(null);
        }
    }, [checkedState, openModal, stringParams]);
  
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
          className=" vertical_align cursor_pointer"
          onClick={handleOpenModal}
          style={{ background: 'none', border: 'none' }}
        >
        Reporte en Excel
        </button>
        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="display_ flex justify_center margin_none">
            <Box className="modal_box justify-center modal_spacing scroll_modal">
              <div className="header_select f_wrap margin_top_m margin_bottom_s justify_center_mobile">
                <Button
                  onClick={handleCloseModal}
                  className="modal_close_button display_none_desktop"
                >
                  <CloseIcon />
                </Button>
                <h3 className="text_center margin_top_s">
                  Seleccione la información que contendrá el reporte
                </h3>
                <div className="display_flex">
                  <Button
                    onClick={handleCloseModal}
                    className="modal_close_button display_none_mobile"
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="text_bolder"
                          checked={checkedAll}
                          onChange={handleChangeSelectAll}
                          color="primary"
                        />
                      }
                      label="Seleccionar todo"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontWeight: 600,
                        },
                      }}
                    />
                    <div className="width_100_mobile justify_center_mobile">
                      <Button className="text_capitalize button_primary margin_bottom_s" href={void(0)} onClick={handlePrepareDownload} target="_self" rel="noreferrer">
                        <FileDownloadOutlinedIcon />
                        Descargar reporte
                      </Button>
                    </div>
                  </div>
                  <div className="modal_double_border margin_bottom_m">
                    <FormGroup className="display_grid columns">
                      {optionsExcel.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          control={
                            <Checkbox
                              checked={checkedState[option.label]}
                              onChange={handleChangeCheck}
                              name={option.label}
                            />
                          }
                          label={option.label}
                        />
                      ))}
                    </FormGroup>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </Modal>
      </>
    );
    
};