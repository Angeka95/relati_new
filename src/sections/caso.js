import '../App.css';
import { Container, Grid, TextField, Button, Snackbar, Box, AppBar, Tabs, Tab, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TabCustom from '../components/tab.js';
import axios from 'axios';

export default function Caso() {
  const [value, setValue] = React.useState(0);

  const handleChangeTabCaso = (event, newValue) => {
    setValue(newValue);
  };


  const options = ['Apertura', 'Determinación de hechos y conductas', 'Resolución de conclusiones', 'Acreditación de víctimas individuales y colectivas', 'Auto que fija fecha de audiencia y/o diligencia', 'Régimen de condicionalidad', 'Otras decisiones'];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const [value2, setValue2] = React.useState(0);
  const subcasos = ['Subcaso 01', 'Subcaso 02', 'Subcaso 03', 'Subcaso 04'];
  const [selectedSubcasos, setSelectedSubcasos] = useState([]);

  const handleSelectSubcasos = (event2) => {
    setSelectedSubcasos(event2.target.value2);
  };

  const playlistId = 'PLbtegW3d3L4IAUQrIcYb8-ADAD1FDPmLc'; // Reemplaza con tu ID de lista de reproducción

  const macrocasos = [
    {
      numeroCaso: '01',
      descripcionCaso: 'Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP',
      enQueVa: 'La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero.',
      pdfInfografia: 'https://relatoria.jep.gov.co/documentos/infografias/macrocaso001.pdf',
    },
    {
      numeroCaso: '02',
      descripcionCaso: 'Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP',
      enQueVa: 'La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero.',
      pdfInfografia: 'https://relatoria.jep.gov.co/documentos/infografias/macrocaso001.pdf',
    }
  ]

  const timeLine = [
    {
      mes: 'Abril',
      año: '2024',
      hecho: 'Audiencia Pública de Reconocimiento',
      actor: '',
      enlace: ''
    },
    {
      mes: 'Marzo',
      año: '2024',
      hecho: 'Auto que Decreta Audiencia Pública de Reconocimiento',
      actor: '',
      enlace: ''
    },
    {
      mes: 'Diciembre',
      año: '2023',
      hecho: 'Tercer auto de determinación de hechos y conductas: ',
      actor: 'Comando Conjunto de Occidente',
      enlace: 'https://relatoria.jep.gov.co/documentos/providencias/1/1/Auto_SRVR-08_19-diciembre-2023.pdf'
    },
    {
      mes: 'Noviembre',
      año: '2023',
      hecho: 'Participación de las víctimas',
      actor: '',
      enlace: ''
    },
    {
      mes: 'Julio',
      año: '2023',
      hecho: 'Segundo auto de determinación de hechos y conductas:',
      actor: 'Comando Conjunto Central',
      enlace: 'xx'
    },
    {
      mes: 'Junio',
      año: '2023',
      hecho: 'Audiencia de observaciones',
      actor: '',
      enlace: 'xx'
    },
    {
      mes: 'Enero',
      año: '2023',
      hecho: 'Competencia del tribunal para la paz ',
      actor: '',
      enlace: 'x'
    },
    {
      mes: 'Noviembre',
      año: '2022',
      hecho: 'Resolución de conclusiones',
      actor: '',
      enlace: 'x'
    },
    {
      mes: 'Febrero',
      año: '2022',
      hecho: 'Audiencia Pública de Reconocimiento',
      actor: '',
      enlace: 'xx'
    },

    {
      mes: 'Octubre',
      año: '2021',
      hecho: 'Observaciones y solicitudes',
      actor: '',
      enlace: 'xx'
    },
    {
      mes: 'Agosto',
      año: '2021',
      hecho: 'Audiencias',
      actor: '',
      enlace: ''
    },

    {
      mes: 'Enero',
      año: '2021',
      hecho: 'Auto de determinación de hechos y conductas:',
      actor: 'Antiguo Secretariado',
      enlace: 'xx'
    },

    {
      mes: 'Julio',
      año: '2018',
      hecho: 'Auto de Apertura',
      actor: '',
      enlace: 'xx'
    },

  ];

  return (
    <div>
      <Box className="secondary_blue caso_intro ">
        <div className="width_100 justify_center">
          <h1 className=" text_center text_white underline_green ">Caso 01</h1>
        </div>
        <h4 className="width_100 text_center margin_bottom_m text_white text_bold title_description">Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP</h4>
      </Box>
      <Container>
        <div className="wrap margin_top_l justify_center ">
          <h2 className="text_bolder subtitulo_caso">En qué va el Caso 01</h2>
          <div className="actualizacion_caso">
            <p>La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero. </p>
            <Button className="button_terciary shadow text_transform_none margin_bottom_m" >Saber más del Caso</Button>
          </div>
        </div>
      </Container>
      <Container className="margin_top_l">
        <div className="timeline">
          <div className="timeline_dot_initial" />
          {timeLine.map((event, index) => (

            <div className="timeline_item" key={index}>
              <h6 className="timeline_month">{event.mes}</h6>
              <h6 className="timeline_date text_bolder">{event.año}</h6>
              <div className="timeline_line" />
              <div className="timeline_dot" />
              <div className="timeline_content">
                {event.enlace.length > 0 ? (
                  <a href={event.enlace} target="_blank" className="link_primary link_nounderline ">
                    <h6>{event.hecho}</h6>
                    <p className="margin_bottom_l">{event.actor}</p>
                  </a>
                ) : (
                  <>
                    <h6>{event.hecho}</h6>
                    <p className="margin_bottom_l">{event.actor}</p>
                  </>
                )
                }


              </div>

            </div>
          ))}
          <div className="timeline_dot_end" />

        </div>


      </Container>
      <Container>
        <div className="">
          <h2 className="text_bolder width_100 text_center">Decisiones relacionadas al caso</h2>
          <h5 className="margin_top_m text_center margin_bottom_l">Encuentre las decisiones relacionadas al Caso 01</h5>
        </div>

        <></>

        <Container>

          <AppBar position="static" className="noshadow ">
            <Tabs value={value} onChange={handleChangeTabCaso} className='light_white ' classes={{ indicator: 'custom_indicator' }}>

              <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Sala" />
              <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Tribunal" />

            </Tabs>
            <div className="separator_tab"> </div>
          </AppBar>
          <Box p={3}>
            <div >


              <Container className='width_100 margin_bottom_l'>
                <div className="wrap justify_center item_boletin_container">


                  {value === 0 && (
                    <Box sx={{ p: 3 }}>
                      <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones</h5>
                      <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} className="wrap">
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel id="multi-select-label">Tipo de Decisión</InputLabel>
                              <Select
                                labelId="multi-select-label"
                                multiple
                                value={selectedOptions}
                                onChange={handleSelectChange}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} sx={{ m: 0.5 }} />
                                    ))}
                                  </Box>
                                )}
                              >
                                {options.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>

                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel id="multi-select-label">Subcaso</InputLabel>
                              <Select
                                labelId="multi-select-label"
                                multiple
                                value={selectedSubcasos}
                                onChange={handleSelectSubcasos}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value2) => (
                                      <Chip key={value2} label={value2} sx={{ m: 0.5 }} />
                                    ))}
                                  </Box>
                                )}
                              >
                                {subcasos.map((subcasos) => (
                                  <MenuItem key={subcasos} value={subcasos}>
                                    {subcasos}
                                  </MenuItem>
                                ))}
                              </Select>

                            </FormControl>
                          </Grid>

                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {value === 1 && (
                    <Box sx={{ p: 3 }}>
                      <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones</h5>
                    </Box>
                  )}


                </div>
              </Container>



            </div>
          </Box>

        </Container>
        <div className="margin_top_l">
                <h2 className="text_bolder width_100 text_center margin_bottom_m">Audiencias</h2>
                  <div className="justify_center"> 
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube Playlist"
                    ></iframe>
                  </div>
              </div>

      </Container>






    </div>
  );
}
