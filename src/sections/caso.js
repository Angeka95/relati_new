import '../App.css';
import { Container, Tooltip, Grid, TextField, Button, Snackbar, Box, AppBar, Tabs, Tab, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TabCustom from '../components/tab.js';
import axios from 'axios';
import ListVideos from '../components/listVideos.js';
import Carousel from '../components/carousel.js';
import macrocasoService from '../services/macrocaso.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { extraerSpreakerID, obtenerMesEnEspanol, obtenerAnioDeTexto, obtenerAnioMes, ordenarArrayPorFechaHitos } from '../helpers/utils.js';
import { datos_links_toar } from '../data/datos_macrocaso.js';
import DecisionesSalaTribunal from '../components/decisionesSalaTribunal.js';

export default function Caso() {
  
  const navigate = useNavigate();

  
  const [caso, setCaso] = useState({});
  const [message, setMessage] = useState("");
  const [boletinesMacrocaso, setBoletinesMacrocaso] = useState([]);
  const [macrocasos, setMacrocasos] = useState([]);
  const [hitosMacrocasos, setHitosMacrocasos] = useState([]);
  const [timeLine, setTimeLine] = useState([]);

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

  const getHitosMacrocasos = () => {
    macrocasoService
    .getHitosMacrocasos()
    .then(response => {
        if((response.status_info.status === 200) && (response.data.length > 0)) {
            setHitosMacrocasos(response.data);
            setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
        } else {
            setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
        }
    }
    )
    .catch(error => console.log(error));
  };

  useEffect(() => {
    if(hitosMacrocasos.length === 0){
        getHitosMacrocasos();
    } else {
        if(caso !== null) {
          let hitosMacrocasoSeleccionado = hitosMacrocasos.find(item => Object.keys(item)[0] === `caso_${casoId}`);
          hitosMacrocasoSeleccionado = hitosMacrocasoSeleccionado[`caso_${casoId}`].map(item => { 
            let hitoMacrocaso = {
              mes: obtenerMesEnEspanol(item.fecha),
              anio: obtenerAnioDeTexto(item.fecha),
              hecho: item.tipo, //item.asunto
              actor: '',
              enlace: item.enlace,
              fecha: ""
            }
            hitoMacrocaso["fecha"] = obtenerAnioMes(hitoMacrocaso["anio"], hitoMacrocaso["mes"]);
            return hitoMacrocaso;
          });
          setTimeLine(ordenarArrayPorFechaHitos(hitosMacrocasoSeleccionado));
        }
    }
}, [hitosMacrocasos, caso]);
  
  const getBoletinesMacrocaso = (macrocaso) => {
    macrocasoService
        .getBoletinesMacrocaso(macrocaso)
        .then(response => {
            if((response.status_info.status === 200) && (response.data.length > 0)) {
                const arrBoletines = response.data.map(item => { 
                  let boletin = {
                    id : item.id,
                    titulo : item.titulo.trim(),
                    idioma : item.idioma,
                    nombre : item.providencias.nombre,
                    nombreWithExt : `${item.providencias.nombre}.pdf`,
                    pdf:  `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.providencias.hipervinculo}`,
                    fecha: item.anio, 
                    facebook: `https://www.facebook.com/sharer.php?u=${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.providencias.hipervinculo}`,
                    twitter: `https://twitter.com/intent/tweet?text=${item.providencias.nombre}&url=${item.providencias.hipervinculo}`,
                    mail: true,  
                    versionIngles: `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/17/23/en/boletin_eng_diciembre_2022.pdf`,
                    esEspecial: true, 
                    imagenPortada: (item.imagen !== null) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.imagen}` : ``
                    };
                    boletin["anioMes"] = boletin["titulo"].split(" ")[2].concat("-01");     
                  return boletin;
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
    if((caso !== null) && ( caso.macrocaso !== undefined)){
      if(boletinesMacrocaso.length === 0){
        getBoletinesMacrocaso(caso.macrocaso);
      } 
    }
  }, [boletinesMacrocaso, caso]);

  const handleClickToBoletines = () => {
    navigate('/boletines');
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
                <Button target="_blank" rel="noreferrer" href={caso.infografia[0]} className="button_terciary shadow_smooth text_transform_none margin_bottom_m" >Saber más del Caso</Button>
              :
                <Button target="_blank" rel="noreferrer" href="#" className="button_terciary shadow_smooth text_transform_none margin_bottom_m" >Saber más del Caso</Button>
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
                <h6 className="timeline_date text_bolder">{event.anio}</h6>
                <div className="timeline_line" />
                <div className="timeline_dot" />
                <div className="timeline_content">
                  {event.enlace.length > 0 ? (
                    <a href={event.enlace} target="_blank" rel="noreferrer" className="link_primary link_nounderline ">
                      <Tooltip title={event.hecho}>
                      <h6 className="limit_lines">{event.hecho}</h6>
                      </Tooltip>
                      <p className="margin_bottom_l">{event.actor}</p>
                    </a>
                  ) : (
                    <>
                    <Tooltip title={event.hecho}>
                      <h6 className="limit_lines">{event.hecho}</h6>
                    </Tooltip>
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
                {( datos_links_toar[0]["link"] !== "") && 
                 <Button className="button_primary" href={datos_links_toar[0]["link"]} target='_blank' rel="noreferrer">{datos_links_toar[0]["nombre"]}</Button>
                }
                {( datos_links_toar[1]["link"] !== "") && 
                 <Button className="button_primary" href={datos_links_toar[1]["link"]} target='_blank' rel="noreferrer">{datos_links_toar[1]["nombre"]}</Button>
                }
              </div>
            </Container>
          </div>
        </Box>
        
        {/* Decisiones relacionadas por sala y tribunal*/}
        <DecisionesSalaTribunal caso={caso} />
        {/* Decisiones relacionadas por sala y tribunal*/}
        
        <Container>
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
          { /*(caso["multimedia"] = "https://open.spotify.com/embed/show/5hEeZojgIOkXfOkGxDDsiS?utm_source=generator") && (<></>) */}
          {((caso.hasOwnProperty("multimedia")) && (caso.multimedia !== "")) && (
            <>
              <h2 className="text_bolder width_100 text_center margin_bottom_m ">Podcast relacionado al Caso</h2>
              <div className="justify_center"> 
                <iframe className="podcast_container shadow_smooth"
                src={caso.multimedia} width='100%' height='100px' frameBorder="0" title="Podcast relacionado al Caso">
                </iframe>
              </div> 
            </>
          )}
          </div> 
        </Container>
      </div>
    );
  } else {
    return (<></>);
  }
    
}
