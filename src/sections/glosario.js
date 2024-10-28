import '../App.css';
import { Container, TextField, Button, Snackbar } from '@mui/material';

import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';



export default function Glosario() {


    const terminos = [
        {
            id: 1,
            termino: 'Ficha / Ficha Jurisprudencial',
            descripcion: 'Documento que sintetiza los aspectos clave de las decisiones (tales como tipo de actor, conceptos clave, hechos, delitos y aspectos jurídicos clave), para que los usuarios del buscador puedan agilizar sus consultas.',

        },
        {

            id: 2,
            termino: 'Macrocaso',
            descripcion: 'Metodología de agrupación de los hechos y conductas que serán investigados y juzgados por la JEP.',

        },

        {

            id: 3,
            termino: 'Nombre de decisión',
            descripcion: 'ej: Auto_SRVR-002_04-julio-2018',

        },

        {

            id: 4,
            termino: 'Sentencias Interpretativas',
            descripcion: 'Decisiones emitidas por la Sección de Apelación en las cuales se aclaran aspectos de la normatividad transicional surgidos del ejercicio de la actividad judicial de la JEP.',

        },

        {

            id: 5,
            termino: 'Tesauro ',
            descripcion: 'Herramienta que permite tener un vocabulario común y controlado en las decisiones judiciales. Con esta ayuda, el usuario podrá buscar las decisiones por conceptos clave.',

        },

        {

            id: 6,
            termino: 'Titulación',
            descripcion: 'Además de la extracción de los datos propios de identificación de la providencia o criterios del documento, la Relatoría General de la JEP también se encarga de realizar un análisis más detallado de la decisión, enfocado en la parte jurídica. Para ello, identifica los problemas jurídicos que se planteó la magistratura al momento de pronunciarse, así como las respectivas tesis que dan respuesta a esos interrogantes. Para esto, la ficha jurisprudencial incluye unas palabras clave que describen el contenido y los temas de la providencia, las cuales conforman el tesauro. Asimismo, se extraen los bancos de enfoques diferenciales: de: Género; Étnico-racial; Grupos vulnerables; Territorial; Ambiental. ',

        },


    ]

    return (
        <div>
            <Container className="margin_bottom_xl">
                <h1 className="text_center margin_top_l">Glosario de Términos</h1>
                <h5 className="text_center ">Confirme el significado de algunos términos que encontrará en nuestro portal</h5>

                <div className="justify_center ">
                    <div className="box_scrolleable scroll-container margin_top_l">

                        {terminos.length > 0 && (
                            <div className="box_scrolleable_spacing">
                                {terminos.map((termino, index) => (
                                    <div key={termino.id}>
                                        <p className="">
                                            <span className="text_bolder margin_right_s">
                                                {termino.termino}:
                                            </span>
                                            {termino.descripcion}
                                            {index !== terminos.length - 1 && (
                                                <div className="separator_green box_separator_margin"></div>
                                            )}
                                        </p>
                                    </div>
                                ))}

                            </div>

                        )}



                    </div>


                </div>
            </Container>
        </div>
    );
}
