import React, { useEffect, useState } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relativ2.png';
import { Box, Container, Grid, Button } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';

export default function Acerca() {

   



    return (
        <div className="nowrap">
                
                <Container className="margin_top_l ">
                <h2 className="justify_center text_bolder">Acerca de Nosotros</h2>
                <h3> ¿Qué hace la Relatoría General de la JEP? </h3> 
                <p>La Relatoría General de la JEP tiene la función de publicar, clasificar, analizar y divulgar las decisiones judiciales y los demás documentos remitidos por la magistratura de la JEP y otras instancias de la entidad que así lo requieran u ordenen. En ese sentido, a través de la plataforma Relati, se facilita el acceso a la jurisprudencia de la JEP a la población interesada (comparecientes, estudiantes, investigadores, litigantes, etc.), garantizando el cumplimiento del principio de publicidad de las decisiones judiciales. 
                </p> 
                </Container> 

        </div>

    );
}