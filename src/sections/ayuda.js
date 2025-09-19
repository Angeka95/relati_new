import { Container, Button } from '@mui/material';
import React, { useState } from 'react';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

export default function Ayuda() {
    const [showInfo, setShowInfo] = useState(1);

    const toggleInfo = (id) => {
        setShowInfo((prevId) =>
            prevId === id ? null : id
        );
    }

    const manual = [
        {
            id: 1,
            nombre: "Búsqueda General",
            url: "https://www.youtube.com/embed/KckiSIEZRcY",
            descripcion: `Permite encontrar decisiones mediante palabras clave, radicados o nombre de la decisión. No distingue mayúsculas/minúsculas ni singular/plural. Los resultados se organizan por relevancia o antigüedad, incluyendo un resumen de la decisión, con hechos, problema jurídico, reglas, aplicación al caso concreto; ofrece funcionalidades al usuario para encontrar recursos relacionados con las decisiones, opciones de descarga de resultados de la búsqueda en Excel y acceso a fichas jurisprudenciales. `
        },

        {
            id: 2,
            nombre: "Búsqueda Avanzada",
            url: "https://www.youtube.com/embed/oixcxwftRPw",
            descripcion: `Permite acotar información a partir de la inclusión y exclusión de palabras. Ofrece las opciones: "Frase exacta" para ubicar una frase completa dentro de las decisiones; "Todas las palabras" para incluir en la búsqueda palabras puntuales y "Ninguna de las palabras" para excluir contenido. Facilita investigaciones y análisis académicos mediante combinación de múltiples parámetros. `
        },

        {
            id: 3,
            nombre: "Todas las Decisiones",
            url: "https://www.youtube.com/embed/KckiSIEZRcY",
            descripcion: `Vista panorámica de toda la jurisprudencia publicada en tiempo real. Diseñada para análisis estadístico con filtros por Sala, año, departamento, delito, macrocaso y procedimiento. Permite descarga en Excel de los resultados de la búsqueda. Facilita monitoreo de actividad judicial contemporánea,  identificación de patrones temporales y análisis cuantitativos.`
        },
        {
            id: 4,
            nombre: "Macrocasos",
            url: "https://www.youtube.com/embed/oixcxwftRPw",
            descripcion: `Facilita comprensión del avance jurídico de uno de los 11 macrocasos de la JEP, a través de la líneas de tiempo, fichas gráficas y  productos de divulgación como boletinesy el podcast "Relatos de la JEP". Permite consultar decisiones de Salas de Justicia y Tribunal para la Paz de cada macrocaso.  `
        },
        {
            id: 5,
            nombre: "Tesauro",
            url: "https://www.youtube.com/embed/KckiSIEZRcY",
            descripcion: `Sistema de palabras clave organizadas alfabéticamente para acceso preciso a decisiones. Cada término conecta directamente con jurisprudencia indexada profesionalmente. Incluye terminología jurídica técnica y conceptos sustantivos de justicia transicional. Funciona como herramienta educativa para familiarizarse con vocabulario especializado de la JEP. Garantiza exhaustividad mediante vocabulario controlado y estandarizado.`
        },
        {
            id: 6,
            nombre: "Mapa Jurisprudencial",
            url: "https://www.youtube.com/embed/oixcxwftRPw",
            descripcion: `Visualización geoespacial de decisiones por departamentos en el mapa de Colombia. Al seleccionar un territorio, despliega decisiones relacionadas con acceso a datos, descarga y fichas. Incluye filtros superiores y gráficas temporales mostrando estadísticas por año. Permite análisis territorial, estudios comparativos regionales e identificación de patrones geográficos en la actividad judicial de la JEP.`
        },

    ]

    const selectedInfo = manual.find(item => item.id === showInfo);


    return (
        <Container className="margin_bottom_xl">
            <h1 className="text_center margin_top_l margin_bottom_l">Ayuda</h1>
            {/* <h5 className="text_center margin_bottom_m">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</h5> */}

            <div className="width_100 panel_display ">

                <div className="panel_small panel_button_container justify_center">
                    <div className="fixed_panel scroll_panel ">
                        {manual.map((info, index) => (
                            <div key={info.id}>

                                {/* <Button onClick={() => toggleInfo(info.id)} className="width_100 text_left display_flex  text_transform_none panel_button " sx={{ justifyContent: 'flex-start', borderRadius: '0px' }} >{info.nombre}</Button>
                                 */}
                                <Button onClick={() => toggleInfo(info.id)} className={`width_100 text_left display_flex text_transform_none panel_button panel_align ${showInfo === info.id ? 'panel_button_active' : ''}`}> {info.nombre}</Button>
                            </div>
                        ))}
                        {/* <Button className="width_100 display_flex   text_transform_none panel_button panel_button_active" sx={{ justifyContent: 'flex-start', borderRadius: '0px' }} >Búsqueda Avanzada</Button> */}


                    </div>
                </div>
                <div className="panel_large panel_text_container panel_mobile">
                    {selectedInfo && (

                        <>
                            <h3>{selectedInfo.nombre}</h3>
                            <p dangerouslySetInnerHTML={{ __html: selectedInfo.descripcion }}></p>

                        </>
                    )}
                </div>
                <div className='panel_small justify_center panel_mobile'>
                    {selectedInfo && (
                        <iframe
                            width="320"
                            height="280"
                            src={selectedInfo.url}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>

            </div>

        </Container>
    );

}

