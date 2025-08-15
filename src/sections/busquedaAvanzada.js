import React from 'react';
import { Container, Grid, Button, Box, Chip } from '@mui/material';
import FormBusquedaAV from '../components/sectionBusquedaAvanzada/formBusqueda.js';
import '../App.css';

const BusquedaAvanzada = ( ) => {
    
  return (
    <>
    <Container className="margin_bottom_xl">
          <div className="search_advance_size">
            <Grid item xs={8} sm={8} md={12} lg={12} xl={12}>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <h1 className="text_center margin_top_l">Búsqueda avanzada</h1>
                <h5 className="text_center margin_bottom_l">Delimite su búsqueda usando una o más palabras claves para los siguientes parámetros.
                  {/* <br></br>
                        Si va a  incluir más de un criterio por campo, sepárelo con una coma. 
                  */}
                </h5>
              </Grid>
              <FormBusquedaAV />
            </Grid>
          </div>    
    </Container>
    </>
  ); 
};

export default BusquedaAvanzada;