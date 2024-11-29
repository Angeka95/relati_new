import '../App.css';
import { Container, Grid, TextField, Button, Snackbar, Box, AppBar, Tabs, Tab, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TabCustom from '../components/tab.js';
import axios from 'axios';
import ListVideos from '../components/listVideos.js';
import Carousel from '../components/carousel.js';
import ListCardSearch from '../components/listCardSearchMacrocasoResults.js';
import macrocasoService from '../services/macrocaso.js';
import { timeLine } from '../data/datos_macrocaso.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { obtenerPalabrasFromArrayObject, extraerSpreakerID  } from '../helpers/utils.js';

export default function Caso() {
  
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [caso, setCaso] = useState({});
  const [tipo_decision, setTipoDecision] = useState("Apertura");
  const [datos, setDatos] = useState([]);
  const [datosSala, setDatosSala] = useState([]);
  const [datosTribunal, setDatosTribunal] = useState([]);
  const [arrDatosMacrocaso, setArrDatosMacrocaso] = useState([]);
  const [arrDatosMacrocasoFiltrados, setArrDatosMacrocasoFiltrados] = useState([]);
  const [message, setMessage] = useState("");
  const [boletinesMacrocaso, setBoletinesMacrocaso] = useState([]);
  const [macrocasos, setMacrocasos] = useState([]);

  const { casoId } = useParams();

  const getMacrocasos = () => {
    macrocasoService
    .getDetailedMacrocasos()
    .then(response => {
        if((response.status_info.status === 200) && (response.data.length > 0)) {
            let arrMacrocasos = response.data.map(item => Object.values(item)[0]);
            setMacrocasos(arrMacrocasos);
            setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
        } else {
            setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
        }
    }
    )
    .catch(error => console.log(error));
};

  useEffect(() => {
      if(macrocasos.length === 0){
          getMacrocasos();
      } else {
          let casoSeleccionado = macrocasos.find(caso => caso.id === parseInt(casoId));
          if (casoSeleccionado !== undefined){
            casoSeleccionado["spreakerID"] = ( casoSeleccionado.multimedia.length > 0 ) ? extraerSpreakerID(casoSeleccionado.multimedia[0]) : ""; 
            setCaso(casoSeleccionado);
          } else {
            navigate('/');
          }
      }
  }, [macrocasos, casoId]);
  
  const getBoletinesMacrocaso = (macrocaso) => {
    macrocasoService
        .getBoletinesMacrocaso(macrocaso)
        .then(response => {
            if((response.status_info.status === 200) && (response.data.length > 0)) {
                let arrBoletines = response.data.map(item => { return {
                    id : item.id,
                    titulo : item.titulo,
                    idioma : item.idioma,
                    nombre : item.providencias.nombre,
                    nombreWithExt : `${item.providencias.nombre}.pdf`,
                    pdf:  `https://relatoria.jep.gov.co/${item.providencias.hipervinculo}`,
                    fecha: item.anio, 
                    facebook: `https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/${item.providencias.hipervinculo}`,
                    twitter: `https://twitter.com/intent/tweet?text=${item.providencias.nombre}&url=${item.providencias.hipervinculo}`,
                    mail: true,  
                    versionIngles: `https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_diciembre_2022.pdf`,
                    esEspecial: true, 
                    imagenPortada: (item.imagen !== null) ? `https://relatoria.jep.gov.co/${item.imagen}` : ``
                    }
                });
                setBoletinesMacrocaso(arrBoletines);
                setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
            } else {
                setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
            }
        }
        )
        .catch(error => console.log(error));
  };

  useEffect(() => {
    if(caso !== null){
      if(boletinesMacrocaso.length === 0){
        getBoletinesMacrocaso(caso.macrocaso);
      } 
    }
  }, [boletinesMacrocaso, caso]);

  const handleClickToBoletines = () => {
    navigate('/boletines');
  };

  const setArrayDatosCasos = (arrData) => {
    const newArray = arrData.map(item => {
      //console.log("data",  (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "hechos", null, true) : "???");
      return {
          id: item.id,
          fecha: item.fecha_providencia,
          asunto: item.asuntocaso,
          salaOSeccion: item.despacho.nombre,
          nombreDecision: item.nombre,
          procedimiento: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas, "actuacion") : "???",
          expediente: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas, "nombre") : "???",
          departamento: (item.departamento_ext.length > 0 )? obtenerPalabrasFromArrayObject(item.departamento_ext, "nombre_dpto") : "???",
          magistrado: (item.magistrado.length > 0 )? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "???", 
          municipio: (item.municipio_ext.length > 0 )? obtenerPalabrasFromArrayObject(item.municipio_ext, "nombre_muni", null, false) : "???", 
          delito: (item.delitos.length > 0 )?  obtenerPalabrasFromArrayObject(item.delitos, "delito") : "???", 
          anioHechos: (item.anio_hechos.length > 0 )? obtenerPalabrasFromArrayObject(item.anio_hechos, "anio") : "???", 
          tipo: (item.detalle_caso !== null ) ? item.detalle_caso : "???",
          radicado: (item.radicado.length !== null ) ? item.radicado : "???",
          compareciente: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas, "compareciente", null, false) : "???", 
          tipoSujeto: (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "???",
          accionadoVinculado: (item.accionado.length > 0 )? obtenerPalabrasFromArrayObject(item.accionado, "accionado", null, false): "???",  
          palabrasClaves:  (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "???",
          hechos: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "hechos", null, false) : "???",
          problemasJuridicos: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "nombre", null, false) : "???", 
          reglas: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "reglas", null, false) : "???",
          aplicacionCasoConcreto: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "tesisjurisprudencial", null, false) : "???",
          resuelve: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].resuelve, "descripcion", null, false) : "???",
          documentosAsociados:  (item.providencia_votos.length > 0 )? obtenerPalabrasFromArrayObject(item.providencia_votos, "nombre", null, false): "???", 
          enfoquesDiferenciales: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].enfoques_diferenciales, "nombre_enfoque", null, false): "???", 
          notasRelatoria: ((item.getfichas.length > 0 ) && (item.getfichas[0].hasOwnProperty("notas"))) ? item.getfichas[0].notas : "???", 
          hipervinculo: item.hipervinculo,
          hipervinculoFichaJuris: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id === 14)) ? `https://relatoria.jep.gov.co/downloadfichaext/${item.getfichas[0].id}` : "",
          estadoFichaJuris: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id !== null))  ?  item.getfichas[0].estado_id : "???",
      }
    });
    return newArray;
  }

  const getCasos = (caso) => {
    macrocasoService
        .getCasosXTramite(caso)
        .then(response => {
            if((response.status_info.status === 200) && (response.data.length > 0)) {
                const dataSala = setArrayDatosCasos(response.data[0].casosSala);
                const dataTribunal = setArrayDatosCasos(response.data[0].casosTribunal);
                setDatosSala(dataSala);
                setDatosTribunal(dataTribunal);
                setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
            } else {
                setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
            }
        }
        )
        .catch(error => console.log(error));
  };

  useEffect(() => {
    if(caso !== null) {
      if((datosSala.length === 0) && (datosTribunal.length === 0)) {
        getCasos(caso.nombre);
      } else {
        setDatos(datosSala);
      }
    }
  }, [datosSala, datosTribunal, caso]);

  const handleChangeTabCaso = (event, newValue) => {
    switch(newValue){
      case 0:
            setDatos(datosSala);
            break;
      case 1:
            setDatos(datosTribunal);
            break;
      default:
            setDatos([]);
            break;
    }
    setValue(newValue);
  };

  const tipoDecision = ['Apertura', 'Determinación de hechos y conductas', 'Resolución de conclusiones', 'Acreditación de víctimas individuales y colectivas', 'Auto que fija fecha de audiencia y/o diligencia', 'Régimen de condicionalidad', 'Otras decisiones'];
  const [selectedtipoDecision, setSelectedtipoDecision] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedtipoDecision(event.target.value);
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

  if(caso !== null) {
    return (
      <div>
        <Box className="secondary_blue section_blue ">
          <div className="width_100 justify_center">
            <h1 className=" text_center text_white underline_green ">{caso.titulo}</h1>
          </div>
          <h4 className="width_100 text_center margin_bottom_m text_white text_bold title_description">{caso.tituloDescripcion}</h4>
        </Box>
        <Container>
          <div className="wrap margin_top_l justify_center ">
            <h2 className="text_bolder subtitulo_caso">En qué va el {caso.titulo}</h2>
            <div className="actualizacion_caso">
              <p>{caso.actualizacion}</p>
              {((caso.hasOwnProperty("infografia")) && (caso.infografia.length > 0)  && (caso.infografia[0] !== "")) ?
                <Button target="_blank" href={caso.infografia[0]} className="button_terciary shadow_smooth text_transform_none margin_bottom_m" >Saber más del Caso</Button>
              :
                <Button target="_blank" href="#" className="button_terciary shadow_smooth text_transform_none margin_bottom_m" >Saber más del Caso</Button>
              }
              
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
            <div className="margin_top_m text_center margin_bottom_l"></div>
          </div>
  
          <Container className="shadow_smooth tab_container">
  
            <AppBar position="static" className="noshadow ">
              <Tabs value={value} onChange={handleChangeTabCaso} className='light_white ' classes={{ indicator: 'custom_indicator' }}>
  
                <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Sala"/>
                <Tab className="text_bolder text_nonecase tab_size" label="Trámite ante Tribunal"/>
  
              </Tabs>
              <div className="separator_tab"> </div>
            </AppBar>
            <Box p={3}>
              <div >
  
  
                <Container className='width_100'>
                  <div className="wrap justify_center item_boletin_container">
  
  
                    {value === 0 && (
                      <Box >
                         {selectedtipoDecision.length > 0   && (
                        <h5 className="width_100 text_center margin_m text_bolder">Resultado de búsqueda por:</h5>
                         )}
                         {selectedtipoDecision.length === 0 && selectedSubcasos.length === 0 &&(
                        <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones por Sala</h5>
                         )}
                        <div className="margin_bottom_l">
                          <div className="wrap width_100 display_flex justify_center">
  
                            <FormControl className="input_caso ">
                              <InputLabel className="" id="multi-select-label">Tipo de Decisión</InputLabel>
                              <Select
                                labelId="multi-select-label"
                                multiple
                                value={selectedtipoDecision}
                                onChange={handleSelectChange}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} sx={{ m: 0.5 }} />
                                    ))}
                                  </Box>
                                )}
                              >
                                {tipoDecision.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
  
                            </FormControl>
  
  
  
  
                            <FormControl className="input_caso">
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
                            
  
                            {(selectedtipoDecision.length > 0 || selectedSubcasos.length > 0) && (
                              <div className='width_100'>
                                
                                <ListCardSearch datosTramite={datos} isExternalFilters={false} />
                              </div>
                            )}
                          </div>
                        </div>
                      </Box>
                    )}
                    {/* Tramite Tribunal */}
                    {value === 1 && (
                      <Box >
                        {selectedtipoDecision.length > 0 && (
                        <h5 className="width_100 text_center margin_m text_bolder">Resultado de búsqueda por:</h5>
                         )}
                         {selectedtipoDecision.length === 0 && (
                        <h5 className="width_100 text_center margin_m text_bolder">Seleccione tipo de decisión o subcaso para ver las decisiones por Tribunal</h5>
                         )}
                        <div className="margin_bottom_l">
                          <div className="wrap width_100 display_flex justify_center">
  
                            <FormControl className="input_caso ">
                              <InputLabel className="" id="multi-select-label">Tipo de Decisión</InputLabel>
                              <Select
                                labelId="multi-select-label"
                                multiple
                                value={selectedtipoDecision}
                                onChange={handleSelectChange}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} sx={{ m: 0.5 }} />
                                    ))}
                                  </Box>
                                )}
                              >
                                {tipoDecision.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
  
                            </FormControl>
  
  
  
  
                            <FormControl className="input_caso">
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
                            
  
                            {(selectedtipoDecision.length > 0 || selectedSubcasos.length > 0) && (
                              <div className='width_100'>
                                
                                <ListCardSearch datosTramite={datos} isExternalFilters={true} />
                              </div>
                            )}
                          </div>
                        </div>
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
  
        <Container maxWidth="lg" disableGutters className="margin_top_l ">
          <div className="align_center carousel_main_container margin_top_l " >
              {( boletinesMacrocaso.length === 0) ?
                <LinearWithValueLabel ></LinearWithValueLabel>
              :
                <>
                <div className="wrap text_carousel_container" >
              <h2 className="align_center text_bolder"> Boletines y documentos relacionados</h2>
              <p className=" align_center margin_top_s margin_bottom_m">Acceda al análisis de las decisiones y a las publicaciones relacionadas a este Caso</p>
              <Button className="button_primary " onClick={handleClickToBoletines}> Ver todos los boletines</Button>
                </div>
                  <div className="carousel_container ">
                    <Carousel boletines={boletinesMacrocaso} />
                  </div>
                </>
              }
          </div>
        </Container>
  
        <Container>
  
          <div className="podcast_space margin_bottom_xl ">
            <h2 className="text_bolder width_100 text_center margin_bottom_m ">Podcast relacionados al Caso</h2>
            <div className="justify_center"> 
            {((caso.hasOwnProperty("multimedia")) && (caso.multimedia.length > 0) && (caso.multimedia[0] !== "")) ?
              <iframe className="podcast_container shadow_smooth "
              src={`https://widget.spreaker.com/player?episode_id=${caso.spreakerID}&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true`} width='100%' height='400px' frameBorder='0' title="Podcast relacionados al Caso">
              </iframe> 
          :
              <iframe className="podcast_container shadow_smooth "
              src='https://widget.spreaker.com/player?show_id=5701029&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true' width='100%' height='400px' frameBorder='0' title="Podcast relacionados al Caso">
              </iframe>
          }
            </div> 
          </div>
  
        </Container>
      </div>
    );
  } else {
    return (<></>);
  }
    
}
