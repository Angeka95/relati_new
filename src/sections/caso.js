import '../App.css';
import { Container, Grid, TextField, Button, Snackbar, Box, AppBar, Tabs, Tab, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TabCustom from '../components/tab.js';
import axios from 'axios';
import ListVideos from '../components/listVideos.js';
import Carousel from '../components/carousel.js';
import ListCardSearch from '../components/listCardSearchResults.js';


const boletinesMacrocaso = [
  {
    id: 1,
    pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
    fecha: "2024-01",
    facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
    twitter: 'https://twitter.com/intent/tweet?text=Me gusta boletin_01_enero-2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
    mail: true,
    versionIngles: '',
    esEspecial: false,
    imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8'
  },

  {
    id: 7,
    pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf',
    fecha: "2024-01",
    facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf',
    twitter: "https://twitter.com/intent/tweet?text=Me gusta boletin_05_edicion-especial_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf",
    mail: true,
    versionIngles: '',
    esEspecial: true,
    imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_05_especial_2024.png?ver=2.1'
  },


]



export default function Caso() {

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
    setSelectedSubcasos(event2.target.value);
  };



  // timeline

  const [showMore, setShowMore] = useState(false);

  // Limitar la cantidad de eventos de timeline visibles
  const visibleEvents = showMore ? timeLine : timeLine.slice(0, 4);

  const handleToggle = () => {
    setShowMore(!showMore);
  };


  // ID de lista de reproducción

  const playlistId = 'PLbtegW3d3L4IAUQrIcYb8-ADAD1FDPmLc';



  return (
    <div>
      <Box className="secondary_blue section_blue ">
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
            <Button target="_blank" href="https://relatoria.jep.gov.co/documentos/infografias/macrocaso001.pdf" className="button_terciary shadow_smooth text_transform_none margin_bottom_m" >Saber más del Caso</Button>
          </div>
        </div>
      </Container>
      <Container className="margin_top_l ">
        <div className="timeline ">
          <div className="timeline_dot_initial" />
          {visibleEvents.map((event, index) => (

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
          {showMore && <div className="timeline_dot_end" />}
        </div>
        <div className="justify_center ">

          {timeLine.length > 4 && (
            <Button onClick={handleToggle} className="link_secondary text_lowercase">
              {showMore ? 'Ver menos sucesos' : 'Ver más Sucesos'}
            </Button>
          )}
        </div>




      </Container>

      <Box className="cta_boletines_container ">
        <div className="cta">
          <Container >
            <div className="cta_container">
              <h6 className="text_bolder cta_text">Conozca los lineamientos en materia de sanción propia y Trabajos, Obras y Actividades con contenido Reparador (TOAR)</h6>
              <Link to="/suscripcion">
                <Button className="button_primary button_container">Ver TOAR</Button>
              </Link>
            </div>
          </Container>
        </div>
      </Box>

      <Container >
        <div className="margin_top_xl">
          <h2 className="text_bolder width_100 text_center ">Decisiones relacionadas al Caso</h2>
          <h5 className="margin_top_m text_center margin_bottom_l">Encuentre las decisiones relacionadas al Caso 01</h5>
        </div>

        <Container className="shadow_smooth tab_container">

          <AppBar position="static" className="noshadow ">
            <Tabs value={value} onChange={handleChangeTabCaso} className='light_white ' classes={{ indicator: 'custom_indicator' }}>

              <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Sala" />
              <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Tribunal" />

            </Tabs>
            <div className="separator_tab"> </div>
          </AppBar>
          <Box p={3}>
            <div >


              <Container className='width_100'>
                <div className="wrap justify_center item_boletin_container">


                  {value === 0 && (
                    <Box >
                      <h5 className="width_100 text_center margin_m text_bolder">Resultados de búsqueda</h5>
                      <div  className="margin_bottom_l">
                        <div className="wrap width_100">
                           
                            <FormControl className="input_caso">
                              <InputLabel className="" id="multi-select-label">Tipo de Decisión</InputLabel>
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
                          
                        

                         
                            <FormControl  className="input_caso">
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
                         

                          {(selectedOptions.length > 0 || selectedSubcasos.length > 0) && (
                            <div className='width_100'>
                              <ListCardSearch isExternalFilters={true}/>
                            </div>
                          )}
                        </div>
                      </div>
                    </Box>
                  )}
                  {value === 1 && (
                    <Box >
                      <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones por Tribunal</h5>
                    </Box>
                  )}


                </div>
              </Container>



            </div>
          </Box>

        </Container>
        <div className="margin_top_xxl ">
          <h2 className="text_bolder width_100 text_center margin_bottom_m">Audiencias del Caso</h2>
          <ListVideos> playlistId = {playlistId}</ListVideos>
        </div>

      </Container>

      <Container maxWidth="lg" disableGutters className="margin_top_l">
        <div className="align_center carousel_main_container margin_top_l" >
          <div className="wrap text_carousel_container" >
            <h2 className="align_center text_bolder"> Boletines y documentos relacionados</h2>
            <p className=" align_center margin_top_s margin_bottom_m">Acceda al análisis de las decisiones y a las publicaciones relacionadas a este Caso</p>
            <Button className="button_primary "> Ver todos los boletines</Button>
          </div>
          <div className="carousel_container">

            <Carousel boletines={boletinesMacrocaso} />

          </div>
        </div>



      </Container>

      <Container>

        <div className="margin_top_xxl margin_bottom_xl">
          <h2 className="text_bolder width_100 text_center margin_bottom_m">Podcast relacionados al Caso</h2>

          <iframe className="podcast_container shadow_smooth"
            src='https://widget.spreaker.com/player?show_id=5701029&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true' width='100%' height='400px' frameborder='0'>

          </iframe>
        </div>

      </Container>









    </div>
  );
}
