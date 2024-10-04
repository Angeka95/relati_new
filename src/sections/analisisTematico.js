import React, { useEffect, useState } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relativ2.png';
import { Box, Container, Grid, Button } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';

export default function Analisis() {

    const temas = [

        {
            id: 1,
            numeroPaso: "1",
            nombreTema: "Definición y priorización de los temas",
        },

        {
            id: 2,
            numeroPaso: "2",
            nombreTema: "Análisis preliminar de decisiones judiciales y definición de subtemas",
        },

        {
            id: 3,
            numeroPaso: "3",
            nombreTema: "Construcción del Banco de decisiones judiciales relevantes",
        },

        {
            id: 4,
            numeroPaso: "4",
            nombreTema: "Formulación del problema jurídico",
        },

        {
            id: 5,
            numeroPaso: "5",
            nombreTema: "Análisis de las decisiones judiciales: Análisis dinámico y estático",
        },
        {
            id: 6,
            numeroPaso: "6",
            nombreTema: "Documento analítico (Línea)",
        },
        {
            id: 7,
            numeroPaso: "7",
            nombreTema: "Construcción de la tesis jurisprudencial (Respuesta)",
        },
        {
            id: 8,
            numeroPaso: "8",
            nombreTema: "Análisis estático de la decisión de apoyo o punto arquimédico",
        },
        {
            id: 9,
            numeroPaso: "9",
            nombreTema: "Identificación de la decisión arquimédica",
        },



    ]




    return (
        <div className="nowrap">

            <Container className="margin_top_l ">
                <h2 className="justify_center text_bolder">Análisis Temático de Decisiones</h2>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m text_center">Explore como se realiza el análisis sobre temas jurídicos de la JEP, basado en el estudio de sus decisiones judiciales e instrumentos normativos aplicables.   </h5>


                <div className="wrap transition_smooth">

                    {temas.map((tema) => (

                        <div key={tema.id} className="card_small transition_smooth">
                            <p className="text_center">
                                <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">  {tema.numeroPaso} </span>
                                {tema.nombreTema}
                            </p>
                        </div>


                    ))}
                </div>



                <div className="justify_center margin_top_m">

                    <Button className="button_primary"> Ver todos los casos</Button>
                </div>
            </Container>
            <Container className="margin_top_xl ">
                <h2 className="text_bolder text_center"> Documentos de análisis <span className="display_block"> Líneas jurisprudenciales </span>  </h2>
                <div className="wrap"> 
                <div className="page_small transition_smooth">
                    <div className="page_border wrap text_center justify_center">
                        <p className="text_center">Tema Principal </p>
                        <p className="text_bolder width_100">Amnistía  </p>
                        <p className="margin_top_m">Subtema </p>
                        <p className="text_bolder width_100">Amnistía de Sala – Ámbitos de competencia </p>

                    </div>

                </div>
                <div className="page_small transition_smooth">
                    <div className="page_border wrap text_center justify_center">
                        <p className="text_center">Tema Principal </p>
                        <p className="text_bolder width_100">Regímen de condicionalidad</p>
                        <p className="margin_top_m">Subtema </p>
                        <p className="text_bolder width_100">Aporte a la verdad de comparecientes forzosos </p>

                    </div>

                </div>
                <div className="page_small transition_smooth">
                    <div className="page_border wrap text_center justify_center">
                        <p className="text_center">Tema Principal </p>
                        <p className="text_bolder width_100">Justicia restaurativa</p>
                        <p className="margin_top_m">Subtema </p>
                        <p className="text_bolder width_100">Dimensión restaurativa del procedimiento de la JEP</p>

                    </div>

                </div>
                </div>

            </Container>

        </div>

    );
}