import '../App.css';
import { Container, TextField, Button, Snackbar, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Caso() {

    const timeLine = [
        { title: 'Evento 1', description: 'Descripción del evento 1' },
        { title: 'Evento 2', description: 'Descripción del evento 2' },
        { title: 'Evento 3', description: 'Descripción del evento 3' },
        { title: 'Evento 4', description: 'Descripción del evento 4' },
        { title: 'Evento 5', description: 'Descripción del evento 5' },
        { title: 'Evento 6', description: 'Descripción del evento 5' },
        { title: 'Evento 7', description: 'Descripción del evento 5' },
        { title: 'Evento 8', description: 'Descripción del evento 5' },
      ];

  return (
    <div>
    <Box className="secondary_blue caso_intro"> 
        <h1 className=" text_center text_white underline_green">Caso 01</h1>
        <p className="width_100 text_center margin_bottom_m text_white">Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP</p>
    </Box>
    <Container> 
        <div className="wrap margin_top_l justify_center"> 
            <h2 className="text_bolder subtitulo_caso">En qué va el Caso 01</h2>
            <div className="actualizacion_caso"> 
            <p>La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero. </p>
            <Button className="button_terciary shadow text_transform_none">Saber más del Caso</Button> 
            </div>
        </div> 
    </Container> 
    <Container> 

    </Container>

    <div className="timeline">
      <div className="timeline-line" />
      {timeLine.map((event, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <h6>{event.title}</h6>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
