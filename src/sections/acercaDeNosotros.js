import React, { useEffect, useState } from 'react';
import '../App.css';
import { Box, Container, Grid, Button } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';
import foto from "../assets/images/foto.jpg";

export default function Acerca() {

   



    return (
        <div className="margin_bottom_xl">
                
                <Container className="margin_top_l ">
                <h1 className="justify_center text_bolder margin_bottom_l">Acerca de Nosotros</h1>
                <div className="display_flex  container_about_query"> 
                    <div className="container_left_about margin_eje_xl"> 

                            <h2 className="text_bolder margin_bottom_m"> ¿Qué hace la Relatoría General de la JEP? </h2> 
                            <p className="">La Relatoría General de la JEP tiene la función de <strong>publicar, clasificar, analizar y divulgar las decisiones judiciales </strong>y los demás documentos remitidos por la magistratura de la JEP y otras instancias de la entidad que así lo requieran u ordenen. En ese sentido, <strong> a través de la plataforma Relati, se facilita el acceso a la jurisprudencia de la JEP</strong> a la población interesada (comparecientes, estudiantes, investigadores, litigantes, etc.), garantizando el cumplimiento del principio de publicidad de las decisiones judiciales. 
                            </p> 
                    </div> 
                    <div className="container_right_about margin_eje_xl"> 
                        <img src={foto} className="imagen_equipo_relatoria"> 
                        </img>
                    </div>

                </div>


                </Container> 

                <Container> 
                    <div className="width_100 "> 
                        <h2 className="large_text_about text_center margin_top_l text_bolder"> ¿Qué encontrará en Relati? </h2> 
                        <p className="large_text_about text_center margin_top_m margin_bottom_l">
                        En este portal el usuario encontrará, además de las decisiones judiciales, <strong>fichas jurisprudenciales</strong> (que presentan los elementos fácticos y jurídicos clave de las decisiones), así como a herramientas de carácter procedimental e interpretativo como la metodología de <strong>análisis jurisprudencial</strong>, <strong>  boletines jurisprudenciales  </strong> con las decisiones más relevantes de cada mes, el <strong>podcast</strong> "Relatos de la JEP" , un módulo enfocado a <strong>macrocasos</strong>  y un <strong> mapa jurisprudencial  </strong>
                        </p>
                    </div> 
                </Container>

        </div>

    );
}