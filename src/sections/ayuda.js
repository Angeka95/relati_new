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
            descripcion: `La búsqueda general es la forma de encontrar decisiones a partir de palabras clave, temas específicos, número o radicado de la decisión.  
            <br> </br>
            Este buscador arroja la información solicitada a partir de una serie de datos que llamamos “metadatos” que tiene cada decisión, y muestra las decisiones que tienen mayor relevancia frente a la solicitud luego de una serie de procesos lógicos dentro de la plataforma.  
            <br> </br>
            Se debe aclarar que para esta búsqueda no es necesario el uso de comillas, no es relevante escribir en mayúscula o minúscula ni en singular o plural.  
            <br> </br>
            Los resultados que arroja se pueden organizar por relevancia o por antigüedad.  
            <br> </br>
            Cada resultado muestra los metadatados: el nombre de la decisión, la síntesis, la Sala o Sección, si tiene asociación a algún macrocaso, el procedimiento, el departamento de los hechos, el delito y el expediente.  
            <br> </br>
            Además, en la sección de datos específicos se muestran los campos del análisis IRAC, que son las palabras clave, el análisis jurídico, la conclusión, el resuelve, los magistrados y los sujetos procesales.  
            <br> </br>
            Si la decisión tuvo algún tipo de recurso, aparece un semáforo que señala qué decisión tomó la providencia que resolvió el recurso y en documentos asociados se puede ver el detalle de esa decisión y se puede acceder a ella.  
            <br> </br>
            Igualmente, en la sección de documentos asociados aparece el salvamento o aclaración de voto del magistrado/a en caso de votar de esa forma.  
            <br> </br>
            El botón verde en cada decisión permite descargar la providencia y el botón azul aparece únicamente en las decisiones con una ficha jurisprudencial.  `
        },

        {
            id: 2,
            nombre: "Búsqueda Avanzada",
            url: "https://www.youtube.com/embed/oixcxwftRPw",
            descripcion: `La busuqear general permite buscar por palabras claves`
        },

        {
            id: 3,
            nombre: "Todas las Decisiones",
            url: "https://www.youtube.com/embed/KckiSIEZRcY",
            descripcion: `La busuqear general permite buscar por palabras claves`
        },
        {
            id: 4,
            nombre: "Macrocasos",
            url: "https://www.youtube.com/embed/oixcxwftRPw",
            descripcion: `Esta sección presenta los avances de los 11 macrocasos que investiga la JEP, enfocándose en las decisiones dentro de cada macrocaso.  
            <br> </br>
            Para cada uno de los casos se muestra el título y un breve resumen sobre su avance. 
            <br> </br>
            Si se da click sobre “Saber más del caso” se dirigirá a la ficha gráfica de cada macrocaso, donde se podrá conocer más a detalle de los avances en la investigación.  
            <br> </br>
            Igualmente, por cada macrocaso se muestra una línea de tiempo con las decisiones más relevantes.   
            <br> </br>
            En la sección de “Decisiones relacionadas con el caso” se pueden conocer todas las providencias de las Salas de Justicia y el Tribunal para la Paz con cada macrocaso. Solo se debe seleccionar el tipo de decisión y el sistema arroja el resultado. 
            <br> </br>
            Además, se pueden consultar las audiencias de cada macrocaso.  
            <br> </br>
            Finalmente, se presentan otros productos de divulgación de la Relatoría relacionados con cada macrocaso. Puntualmente, boletines y documentos relacionados y el podcast “Relatos de la JEP”.  `
        },
        {
            id: 5,
            nombre: "Tesauro",
            url: "https://www.youtube.com/embed/KckiSIEZRcY",
            descripcion: `La busuqear general permite buscar por palabras claves`
        },
        {
            id: 6,
            nombre: "Mapa Jurisprudencial",
            url: "https://www.youtube.com/embed/oixcxwftRPw",
            descripcion: `La busuqear general permite buscar por palabras claves`
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

