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
            dscripcionTema: `Esta es una labor preparatoria que corresponde al responsable de la elaboración de cada línea jurisprudencial, con la validación interna por parte de la Relatora General, donde se definen temas generales de interés que se abordan en decisiones judiciales de la JEP y que orientarán la posterior obtención, consolidación y análisis de providencia que se desarrollarán a través de la línea jurisprudencial.

            El tema, por tanto, se puede identificar de la relación que se haga entre los hechos que se exponen en la sentencia o de las pretensiones de cada actuación y su relación con la parte considerativa, en donde se encuentran las razones directas bajo las cuales se aprueba el fallo.

            Este ejercicio preparatorio no se reflejaría en un contenido específico del módulo de líneas jurisprudenciales de Relati, sino que corresponde al trabajo previo a la elaboración de los productos que allí se publicarían.

            En términos de información empleada, la priorización de temas tiene como insumos:

            Revisión de material bibliográfico interno de la JEP (cuyos ejemplares en formato digital se encuentran al acceso desde la página web oficial);
            Estudio especial de las sentencias interpretativas (SENIT) de la JEP (cuya consulta se puede hacer a través de Relati);
            Análisis de documentos de política de la JEP, como Manuales, Protocolos, Lineamientos, Procedimientos internos (cuya consulta se puede hacer a través de Relati; Banner de “Normativa” de la página principal de la JEP; Jurinfo – Normativa interna de la JEP)
            Estudio de temas abordados a través de los espacios de formación promovidos desde la JEP (cuya consulta se puede hacer desde el Campus Virtual de la JEP).
            Identificación de temas a través de espacios de divulgación y difusión de información de la JEP (cuya consulta se puede hacer a través del Canal de Youtube de la JEP y espacio de “Boletines de jurisprudencia” en Relati)`
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
            nombreTema: "Identificación de la decisión arquimédica Documento analítico (Línea)",
        },
        {
            id: 7,
            numeroPaso: "7",
            nombreTema: " Análisis estático de la decisión de apoyo o punto arquimédico",
        },
        {
            id: 8,
            numeroPaso: "8",
            nombreTema: "Construcción de la tesis jurisprudencial (Respuesta)",
        },
        {
            id: 9,
            numeroPaso: "9",
            nombreTema: "Documento analítico (Línea)",
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