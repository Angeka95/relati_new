import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid, Box, Button } from '@mui/material';

import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';



export default function SearchResults() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  

  return (
    <div>
    <Container maxWidth="lg" disableGutters>
          <h1 className="width_100 text_center margin_top_m">Boletines Jurisprudenciales</h1>
          <p className="text_center margin_bottom_m title_description ">Destacamos aquí las decisiones judiciales más importantes de las Salas y Secciones de la JEP. Este producto editorial plasma la síntesis de los casos, las reglas y argumentos de derecho, así como el sentido de la decisión</p>
          <div className="nowrap align_center carousel_main_container"> 
            <p className="margin_bottom_m align_center text_carousel_container">Consulte las decisiones más relevantes de la JEP, analizadas mes a mes</p>
            <div className="carousel_container">

                <Carousel/>
                </div> 
          </div> 

          

    </Container>
    <Box className= "cta_boletines_container "> 
        <div className="cta">
            <Container > 
                <div className="cta_container"> 
                    <h6 className="text_bolder cta_text">Suscríbase y reciba mes a mes un boletín con el análisis de las decisiones más relevantes</h6> 
                    <Button className="button_primary">Suscribirse</Button> 
                </div>
            </Container>
        </div>
    </Box>
    <Box> 
        <div className="margin_bottom_xl"> </div> 

            <TabCustom />
    </Box>
    </div>
  );
}
