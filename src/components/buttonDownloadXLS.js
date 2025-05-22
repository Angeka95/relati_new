import React, { useState, useEffect } from 'react';
import { getDownloadResultsXLS } from '../services/downloads.js';
import { Stack, Pagination, PaginationItem, List, ListItem, Button, Box, Chip, Alert, Modal, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import '../App.css';
import CloseIcon from '@mui/icons-material/Close';


export default function ButtonDownloadXLS({ stringURL, stringParams, datosToExport, filename = 'archivo.xlsx', requireService = 'no' }) {

  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", classname: "" });


  // modal excel 
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);



  // checklist modal 

  const optionsExcel = ["Accionado / vinculado", "Análisis caso concreto", "Año de los hechos", "Autor", "Compareciente", "Conclusión", "Delito", "Departamento", "Derecho fundamental", "Enfoque diferencial", "Enlace", "Expediente", "Fecha de providencia", "Hechos / Antecedentes", "Macrocaso asociado", "Municipio", "Nombre", "Palabras clave", "Problema jurídico", "Procedimiento", "Radicado", "Reglas jurídicas", "Resuelve", "Sala / Sección", "Síntesis", "Tipo de compareciente", "Tipo de documento"];
  const initialState = optionsExcel.reduce((acc, option) => {
    acc[option] = true;
    return acc;
  }, {});

  const [checkedState, setCheckedState] = useState(initialState);

  const handleChangeCheck = (event) => {
    const { name, checked } = event.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

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

  useEffect(() => {
    if ((stringParams.length > 0) && (requireService === "no")) {
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



  if (requireService === "no") {

    return (
      <>
        {/* <a className="link_primary vertical_align" href={downloadLink} download={filename} target="_blank" rel="noreferrer">
                <FileDownloadOutlinedIcon/> 
                Descargar reporte en Excell
            </a> */}
        <a className="link_primary vertical_align cursor_pointer" onClick={handleOpenModal}>
          <FileDownloadOutlinedIcon />
          Descargar reporte en Excel
        </a>

        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="display_ flex justify_center margin_none">
            <Box className="modal_box justify-center  modal_spacing scroll_modal">
              <div className="header_select f_wrap margin_top_m margin_bottom_s justify_center_mobile ">
                <Button onClick={handleCloseModal} className="modal_close_button display_none_desktop">
                  <CloseIcon />
                </Button>
                <h3 className="text_center  margin_top_s ">Seleccione la información que contendrá el reporte</h3>
                <div className="display_flex ">
                  <Button onClick={handleCloseModal} className="modal_close_button display_none_mobile">
                    <CloseIcon />
                  </Button>
                </div>
              </div>
              <div className='header_select margin_bottom_s margin_top_m'>

                <FormControlLabel
                  control={
                    <Checkbox className="text_bolder"
                      checked={checkedAll}
                      onChange={handleChangeSelectAll}
                      color="primary"
                    />
                  }
                  label="Seleccionar todo"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontWeight: 600
                    }
                  }}
                />

                <div className="width_100_mobile justify_center_mobile">
                  <Button className="text_capitalize button_primary margin_bottom_s"><FileDownloadOutlinedIcon /> Descargar Excel</Button>

                </div>

              </div>


              <div className=" modal_double_border ">

                <FormGroup className='display_grid  columns '>
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

              <div>

              </div>
              <div className="justify_center width_100 flex_nowrap">
                {/* <Link to="/busqueda-avanzada">
                                                                          <Button className="text_capitalize button_primary margin_bottom_s">Búsqueda Avanzada</Button> 
                                                                      </Link> */}
              </div>



            </Box>
          </div>
        </Modal>
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
                <FileDownloadOutlinedIcon />
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
              <FileDownloadOutlinedIcon />
              Descargar reporte en Excel
            </a>
          </>
        )}
      </>
    );
  }
};