import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';
import { Link } from 'react-router-dom';
import boletinesService from '../services/boletines.js';
import datos_boletines_anios from '../data/data_boletines_anios.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import { obtenerPalabrasFromArrayObject, formatDateToMonthYear } from '../helpers/utils.js';

const boletines_ = datos_boletines_anios;

export default function SearchResults() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [message, setMessage] = useState("");
  const [boletines, setBoletines] = useState([]);
  const [boletinesAnio, setBoletinesAnio] = useState([]);
  
//   const [dataBoletines, setDataBoletines] = useState([]);

//     const handleClickBoletines = () => {
//         setDataBoletines(boletines);
//         }
    const getBoletines = () => {
        boletinesService
            .getBoletinesAnios()
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    let arrBoletines = response.data.map(item => { 
                      return {
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
                        versionIngles: (item.idioma !== "Español") ? `https://relatoria.jep.gov.co/${item.providencias.hipervinculo}` : '',
                        esEspecial: true, 
                        imagenPortada: (item.imagen !== null) ? `https://relatoria.jep.gov.co/${item.imagen}` : ``,
                        palabrasClave: (item.palabras.length > 0 )? obtenerPalabrasFromArrayObject(item.palabras, "palabra") : "",
                        tema: (item.temas.length > 0 )? obtenerPalabrasFromArrayObject(item.temas, "tema") : "",
                        rango: (item.providencias_asociadas.length > 0 )? formatDateToMonthYear(item.providencias_asociadas[0].fecha_providencia) : "",
                        }
                    });
                    setBoletines(arrBoletines);
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
                } else {
                    setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
                }
            }
            )
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if(boletines.length === 0){
            getBoletines();
        } 
    }, [boletines]);

    const titleBoletin = "Boletines";
    const titleEspecial = "Ediciones Especiales"

  return (
    <div>
    <Container maxWidth="lg" disableGutters>
          <h1 className="width_100 text_center margin_top_l">Boletines Jurisprudenciales</h1>
          <h5 className="text_center title_description margin_bottom_l">Destacamos aquí las decisiones judiciales más importantes de las Salas y Secciones de la JEP. Este producto editorial plasma la síntesis de los casos, las reglas y argumentos de derecho, así como el sentido de la decisión</h5>
          {( boletines.length === 0 ) ? 
                    <LinearWithValueLabel></LinearWithValueLabel>
                :
                <div className="align_center carousel_main_container"> 
                  <p className=" align_center text_carousel_container">Consulte las decisiones más relevantes de la JEP, analizadas mes a mes</p>

                  <div className="carousel_container ">
                      <Carousel boletines={boletines}/>
                  </div> 
                </div> 
          }

    </Container>
    <Box className= "cta_boletines_container "> 
        <div className="cta">
            <Container > 
                <div className="cta_container"> 
                    <h6 className="text_bolder cta_text">Suscríbase y reciba mes a mes un boletín con el análisis de las decisiones más relevantes</h6> 
                    <Link to="/suscripcion">
                    <Button className="button_primary">Suscribirse</Button>
                    </Link>
                </div>
            </Container>
        </div>
    </Box>
    
      
            <Container maxWidth="lg" disableGutters sx={{ mt: 5, mb: 5 }}> 
            {( boletines.length === 0 ) ? 
                <LinearWithValueLabel ></LinearWithValueLabel>
            :
                <>
                <div className="margin_bottom_xl"> </div> 
                
                <ul>

              </ul>
                {/* {dataBoletines.length > 0 && (
                <ul>
                  {dataBoletines.map(dataBoletin => (
                    <li key={dataBoletin.id}>
                      {dataBoletin.url} 
                  ))}
                </ul>
              )} */}
                <div> 
                {/* {boletines.map(datoBoletin => (
                  <TabCustom key={datoBoletin.id} pdf={datoBoletin.pdf} fecha={datoBoletin.fecha} imagenPortada={datoBoletin.imagenPortada} />
                ))} */}

                    <TabCustom boletines={boletines} title={titleBoletin}/> 
                </div> 
                </>
              }
               </Container>
<Box className="padding-y secondary_blue"> 
          <Container maxWidth="lg" disableGutters >
          <h1 className="width_100 text_center margin_top_l text_white">Ediciones Especiales</h1>
          <h5 className="text_center title_description margin_bottom_l text_white">Destacamos aquí las decisiones judiciales más importantes de las Salas y Secciones de la JEP. Este producto editorial plasma la síntesis de los casos, las reglas y argumentos de derecho, así como el sentido de la decisión</h5>
          {( boletines.length === 0 ) ? 
                    <LinearWithValueLabel></LinearWithValueLabel>
                :
                <div className="align_center carousel_main_container"> 
                  <p className=" align_center text_carousel_container text_white">Consulte las decisiones más relevantes de la JEP, analizadas mes a mes</p>

                  <div className="carousel_container ">
                      <Carousel boletines={boletines}/>
                  </div> 
                </div> 
          }

    </Container>
    </Box>



              
          <div class="margin_top_xl">

        <TabCustom boletines={boletines} title={titleEspecial}/> 
          </div>
    </div>
  );
}
