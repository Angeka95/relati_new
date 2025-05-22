import '../App.css';
import { Container, Box, TextField, Button, Snackbar } from '@mui/material';

import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';



export default function PreguntasFrecuentes() {
    const preguntasFrecuentes = [
        {
            id: 1,
            pregunta: '¿Qué información puedo encontrar en Relati?',
            descripcion: 'En este portal el usuario encontrará, además de las decisiones judiciales, fichas jurisprudenciales (que presentan los elementos fácticos y jurídicos clave de las decisiones), así como a herramientas de carácter procedimental e interpretativo como la metodología de líneas jurisprudenciales, boletines jurisprudenciales con las decisiones más relevantes de cada mes, el podcat "Relatos de la JEP" , un módulo enfocado a macrocasos y un mapa jurisprudencial ',

        },
        {

            id: 2,
            pregunta: '¿Qué puedo hacer en el buscador?',
            descripcion: 'Si conoce algún dato de la decisión que quiere consultar, o si desea conocer las decisiones que se han emitido sobre un tema o en asunto particular, puede usar esta opción. Le ayudará a encontrar de forma rápida y sencilla las decisiones judiciales de la JEP que contengan la información ingresada. Recuerde que al realizar su búsqueda puede usar los filtros para restringir los resultados por criterios específicos, ejemplo: salas o secciones, año de los hechos, departamento, macrocaso, procedimiento, etc...  ',
        },



        {

            id: 4,
            pregunta: '¿Qué es la Titulación?',
            descripcion: 'Además de la extracción de los datos propios de identificación de la providencia o criterios del documento, la Relatoría General de la JEP también se encarga de realizar un análisis más detallado de la decisión, enfocado en la parte jurídica. Para ello, identifica los problemas jurídicos que se planteó la magistratura al momento de pronunciarse, así como las respectivas tesis que dan respuesta a esos interrogantes. Para esto, la ficha jurisprudencial incluye unas palabras clave que describen el contenido y los temas de la providencia, las cuales conforman el tesauro. Asimismo, se extraen los bancos de enfoques diferenciales: de: Género; Étnico-racial; Grupos vulnerables; Territorial; Ambiental. ',



        },

        {

            id: 5,
            pregunta: '¿Qué es una ficha jurisprudencial?',
            descripcion: 'Tras la publicación de las decisiones remitidas por los despachos a la Relatoría General de la JEP en el sistema oficial de divulgación de jurisprudencia (Relati), la decisión pasa por un proceso de lectura y análisis que se plasma en la ficha jurisprudencial, en la cual se extraen los distintos bancos de datos que servirán como criterios de búsqueda. A esta tarea la llamamos titulación.',

        },


        {

            id: 7,
            pregunta: '¿Qué metodología se utiliza para realizar la titulación?',
            descripcion: 'La titulación realizada por la Relatoría General de la JEP ha tenido una constante evolución. Inicialmente, se basó en un análisis de dos niveles que agrupaba tanto los datos esenciales de las providencias como la síntesis de esta y una revisión general de problemas y reglas. Hoy en día, dicha titulación se ha complejizado y se realiza a partir de la metodología IRAC que, en su esencia, exige la identificación de los problemas jurídicos, las reglas jurídicas relevantes, la aplicación de dichas reglas a los casos concretos y las conclusiones de la administración de justicia sobre las cuales se desarrolla una providencia. La integración de esta metodología ha implicado un avance muy relevante para facilitar el procesamiento de la información, pero, sobre todo, para hacer cada vez más sencilla la búsqueda especializada de decisiones judiciales. Así las cosas, partiendo del método IRAC, se ha impulsado una mayor capacidad de clasificación, se han construido mejores herramientas de divulgación y se ha simplificado el análisis jurisprudencial.'


        },




    ]
    // Estado para controlar las preguntas expandidas
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);

    // Función para alternar la expansión de una pregunta
    const toggleExpansion = (id) => {
        setExpandedQuestionId((prevId) =>
            prevId === id ? null : id  // Si la pregunta ya está expandida, la contrae, de lo contrario, la expande
        );
    };


    return (
        <div>
            <Container className="margin_bottom_xl">
                <h1 className="text_center margin_top_l">Preguntas Frecuentes</h1>
                <h5 className="text_center">Encuentre las decisiones de la JEP y conozca la actividad judicial en el territorio Colombiano</h5>

                <div className="justify_center ">
                    <div className="box_scrolleable scroll-container margin_top_l">

                        {preguntasFrecuentes.length > 0 && (
                            <div className="box_scrolleable_spacing ">
                                {preguntasFrecuentes.map((preguntaFrecuente, index) => (
                                    <div key={preguntaFrecuente.id}>
                                        <div
                                            className="width_100 wrap justify_between"
                                            onClick={() => toggleExpansion(preguntaFrecuente.id)} // Alternar expansión
                                        >
                                            <span className="text_bolder margin_right_s text_accordion_size cursor_pointer">
                                                {preguntaFrecuente.pregunta}
                                            </span>
                                            <div className="cursor_pointer">
                                                <ExpandLessOutlinedIcon style={{
                                                    color: '98C438',
                                                    transform: expandedQuestionId === preguntaFrecuente.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.3s ease',
                                                }} />
                                            </div>

                                        </div>
                                        <div style={{marginTop: "1rem", marginBottom: "1rem" }}>
                                            {expandedQuestionId === preguntaFrecuente.id && (
                                                <p>
                                                    {preguntaFrecuente.descripcion}
                                                </p>
                                            )}

                                            {index !== preguntasFrecuentes.length - 1 && (
                                                <div className="separator_green box_separator_margin"></div>
                                            )}
                                        </div>
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
