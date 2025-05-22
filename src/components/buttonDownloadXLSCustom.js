import React, { useState , useEffect } from 'react';
import { getDownloadResultsXLS } from '../services/downloads.js';
import { Modal, Box, Button, FormControlLabel, Checkbox,FormGroup,  } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import '../App.css';

export default function ButtonDownloadXLSCustom() {

    const optionsExcel = ["Accionado / vinculado", "Análisis caso concreto", "Año de los hechos", "Autor", "Compareciente", "Conclusión", "Delito", "Departamento", "Derecho fundamental", "Enfoque diferencial", "Enlace", "Expediente", "Fecha de providencia","Hechos / Antecedentes","Macrocaso asociado","Municipio","Nombre","Palabras clave","Problema jurídico","Procedimiento","Radicado","Reglas jurídicas","Resuelve","Sala / Sección","Síntesis", "Tipo de compareciente","Tipo de documento"]; 
    
    const initialState = optionsExcel.reduce((acc, option) => { acc[option] = true; return acc; }, {});
    
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
            newState[option] = checked; 
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
  
    return (
      <>
        <button
          type="button"
          className="link_primary vertical_align cursor_pointer"
          onClick={handleOpenModal}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <FileDownloadOutlinedIcon />
          Descargar reporte en Excel
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
                  Seleccione la información que contendrá el reporte_
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
                  <Button className="text_capitalize button_primary margin_bottom_s">
                    <FileDownloadOutlinedIcon />
                    Descargar Excel
                  </Button>
                </div>
              </div>
              <div className="modal_double_border">
                <FormGroup className="display_grid columns">
                  {optionsExcel.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={checkedState[option]}
                          onChange={handleChangeCheck}
                          name={option}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </div>
              <div className="justify_center width_100 flex_nowrap">
                {/* 
                <Link to="/busqueda-avanzada">
                  <Button className="text_capitalize button_primary margin_bottom_s">
                    Búsqueda Avanzada
                  </Button>
                </Link> 
                */}
              </div>
            </Box>
          </div>
        </Modal>
      </>
    );
    
};