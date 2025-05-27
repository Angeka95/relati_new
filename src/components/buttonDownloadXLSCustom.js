import React, { useState , useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDownloadResultsXLS } from '../services/downloads.js';
import { Modal, Box, Button, FormControlLabel, Checkbox,FormGroup,  } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import '../App.css';

export default function ButtonDownloadXLSCustom({ stringURL, stringParams, datosToExport, filename = 'archivo.xlsx'}) {

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
        <button
          type="button"
          className="link_primary vertical_align cursor_pointer"
          onClick={handleOpenModal}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <FileDownloadOutlinedIcon />
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
                  <Button className="text_capitalize button_primary margin_bottom_s" href={downloadLink} download={filename} target="_blank" rel="noreferrer">
                    <FileDownloadOutlinedIcon />
                    Descargar Excel
                  </Button>
                </div>
              </div>
              <div className="modal_double_border">
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
            </Box>
          </div>
        </Modal>
      </>
    );
    
};