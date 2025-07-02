import React, { useEffect, useState } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relativ2.png';
import { Box, Container, Grid, Button } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TabAnalisis from '../components/tabAnalisis.js';

export default function Analisis() {

    const temas = [

        {
            id: 1,
            numeroPaso: "1",
            nombreTema: "Definición y priorización de los temas",
            descripcionTema: `Esta es una labor preparatoria que corresponde a la Relatoría General de la JEP, donde se definen temas generales de interés que se abordan en decisiones judiciales de la JEP y que orientarán la posterior obtención, consolidación y análisis de providencias. 
            <br> </br>
            El tema, por tanto, se puede identificar de la relación que se haga entre los hechos que se exponen en la sentencia o de las pretensiones de cada actuación y su relación con la parte considerativa, en donde se encuentran las razones directas bajo las cuales se decide el fallo. 
            <br> </br>
            En términos de información empleada, la priorización de temas puede tener como insumos, según cada caso:
            <br> </br>
            <ul> 
            <li>Revisión de material bibliográfico interno de la JEP (cuyos ejemplares en formato digital se encuentran en la página web oficial)</li>
            <li>Estudio especial de las sentencias interpretativas (SENIT) de la JEP (cuya consulta se puede hacer a través de Relati)</li>
            <li>Análisis de documentos de política de la JEP, como Manuales, Protocolos, Lineamientos, Procedimientos internos (cuya consulta se puede hacer a través de Relati; Banner de “Normativa” de la página principal de la JEP; Jurinfo – Normativa interna de la JEP)</li>
            <li>Estudio de temas abordados a través de los espacios de formación promovidos desde la JEP (cuya consulta se puede hacer desde el Campus Virtual de la JEP).</li>
            <li>Identificación de temas a través de espacios de divulgación y difusión de información de la JEP (cuya consulta se puede hacer a través del Canal de Youtube de la JEP y espacio de “Boletines de jurisprudencia” en Relati)</li>
            </ul>
            `
        },

        {
            id: 2,
            numeroPaso: "2",
            nombreTema: "Análisis preliminar de decisiones judiciales y definición de subtemas",
            descripcionTema: `Este ejercicio preparatorio se lleva a cabo internamente en la Relatoría, correspondiendo al trabajo previo a la elaboración de los productos publicados. 
            <br> </br>
            En la fase correspondiente al análisis preliminar de las decisiones judiciales se requiere realizar una búsqueda de información que permita delimitar los temas y, en caso de ser necesario, los subtemas que se pretendan estudiar, usando como fuentes las decisiones de la JEP. Teniendo en cuenta que el tema puede ser entendido como el asunto general sobre el que trata la decisión judicial y que, a su vez, permite reunir los supuestos de hecho que conforman el problema jurídico, es preciso definir la categoría de los subtemas. 
            <br> </br>
            Los subtemas constituyen los diferentes asuntos que permitirán agrupar y delimitar las diferentes decisiones que conformarán el análisis. Para esto, se definen categorías que permitan agrupar las decisiones que pertenecen al mismo tema general, acotándolas de acuerdo a su contenido y asuntos desarrollados en la parte motiva y en la parte resolutiva.`
        },

        {
            id: 3,
            numeroPaso: "3",
            nombreTema: "Construcción del Banco de decisiones judiciales relevantes",
            descripcionTema: `
            Una vez se cuenta con la definición de temas y subtemas, se puede proceder a la recopilación y consolidación de decisiones judiciales a través de la construcción del Banco de decisiones relevantes. 
             <br> </br>
            Este ejercicio preparatorio se centra en la compilación de las decisiones utilizadas para la elaboración del análisis, identificación de Sala o Sección que las emite, fecha de emisión, número de la decisión, síntesis de problemas y tesis jurídicas.
 <br> </br>
En este sentido, se crea tanto una base de datos, como un repositorio con los documentos de los autos y sentencias.
`
        },

        {
            id: 4,
            numeroPaso: "4",
            nombreTema: "Formulación del problema jurídico",
            descripcionTema: `
            A partir del proceso de revisión de las decisiones judiciales, es necesario desarrollar la construcción de un problema jurídico, correspondiente a la pregunta que se formula a partir de los hechos del caso, las pretensiones y la normativa aplicable. En la medida en que se trata del punto de partida para el análisis, el problema jurídico constituye información que se incorpora dentro de los documentos de análisis temáticos, de acuerdo con el contenido de cada decisión judicial empleada para el efecto. 
            <br> </br>
            En términos de información empleada, la formulación del problema jurídico tiene como insumos la información recopilada en el Banco de decisiones, así como la literalidad de los textos de autos y sentencias empleados para el análisis.
                `

        },

        {
            id: 5,
            numeroPaso: "5",
            nombreTema: "Análisis de las decisiones judiciales: Análisis dinámico y estático",
            descripcionTema: `Con la compilación de las decisiones y la definición del problema jurídico, se procede a su análisis. Este ejercicio corresponde a la base de los documentos publicados en este módulo, toda vez que hace parte de los productos de los análisis temáticos.
                <br> </br>
                Este ejercicio se hace a través de dos tipos de análisis:
                 <br> </br>
                <ul>
                <li>
                 i) el <strong>análisis dinámico</strong>, mediante el estudio de diferentes decisiones encuadradas dentro del tema o subtema objeto de estudio, conforme han sido emitidas a lo largo del tiempo en el periodo que se determine para hacer el producto; y
                </li>
                <li>
                ii) el <strong>análisis estático</strong> que se concentra en el contenido de determinada providencia que se identifica como relevante para la comprensión de la jurisprudencia existente en relación con el tema estudiado.
                </li>
                </ul>

                En este sentido, los documentos publicados dan cuenta de los tipos de análisis efectuados así como de las decisiones estudiadas, conforme se ha explicado en relación con la construcción del Banco de decisiones.

    
            `
        },
        {
            id: 6,
            numeroPaso: "6",
            nombreTema: "Construcción de la tesis jurisprudencial (Respuesta)",
            descripcionTema: `
           Como resultado del ejercicio de análisis conducente a la elaboración del análisis temático, se pueden desarrollar documentos que contengan los resultados, metodologías, procedimientos, selección de decisiones, procesamiento de información y estudio tendiente a la determinación y solución del o de los problemas jurídicos correspondientes; así como para transmitir los resultados y conclusiones del trabajo llevado a cabo a los destinatarios que se determinen.
  <br> </br>
En este sentido, los productos publicados acá dan cuenta de la secuencia lógica que existe desde la determinación de los temas abordados, pasando por la selección de decisiones, la identificación del problema o problemas jurídicos, la sustracción de las tesis jurisprudenciales y las conclusiones o hallazgos de cada análisis temático.
            `

        },




    ]

    const [temaSeleccionadoIndex, setTemaSeleccionadoIndex] = useState(null);
    const [showPasoAnalisis, setShowPasoAnalisis] = useState(false);



    // Estado Botones Pasos 

    const handleSeePasoAnalisis = (index) => {
        setTemaSeleccionadoIndex(index);
        setShowPasoAnalisis(true);
    };

    // 
    const handleHidePasoAnalisis = () => {
        setShowPasoAnalisis(false);
        setTemaSeleccionadoIndex(null); // Resetea el tema seleccionado
    };


    const handleNextPaso = () => {
        if (temaSeleccionadoIndex < temas.length - 1) {
            setTemaSeleccionadoIndex(temaSeleccionadoIndex + 1);
        } 

        // else if (temaSeleccionadoIndex === temas.length - 1) {
        //     setTemaSeleccionadoIndex(0);
        // }

    };



    const docsAnalisis = 
        [
            {
              "id": 1,
              "url": "https://relatoria.jep.gov.co/documentos/libros/CODIGO_JURISDICCION_ESPECIAL_PAZ_1A_ED.pdf",
              "cover": `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_codigo_JEP_c.png`
            },
            {
              "id": 2,
              "url": "https://relatoria.jep.gov.co/documentos/libros/CODIGO_JURISDICCION_ESPECIAL_PAZ_1A_ED.pdf",
              "cover": `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_codigo_JEP_c.png`
            },
            {
                "id": 3,
                "url": "https://relatoria.jep.gov.co/documentos/libros/CODIGO_JURISDICCION_ESPECIAL_PAZ_1A_ED.pdf",
                "cover": `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_codigo_JEP_c.png`
              }
          ]
    


    return (
        <div className="descripcion_nowrap margin_bottom_xl">

            <Container className="margin_top_l ">
                <h1 className="justify_center text_center text_bolder">Análisis Temático de Decisiones</h1>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m text_center">Consulte los análisis temáticos elaborados por la Relatoría General, los cuales se reflejan a través de productos que se elaboran continuamente en cumplimiento de las funciones asignadas a su cargo, conforme a lo dispuesto en el Reglamento General de la JEP. </h5>
                <div className="margin_top_l margin_bottom_m">
                    <p>
                        A continuación, encontrará una breve explicación acerca de la metodología que se sigue para la elaboración de estos análisis temáticos.
                        <br/><br/>
                        Adicionalmente, se pone a su disposición el contenido de los productos contentivos de los análisis elaborados, conforme a los temas que han sido priorizados por parte de la Relatoría, así como aquellos asuntos en los que se ha solicitado la elaboración de este tipo de documentos por parte de la Magistratura de la JEP.
                    </p>

                </div>
                <div className="wrap transition_smooth">
                    {!showPasoAnalisis ? (
                        temas.map((tema, index) => (
                            <div
                                key={tema.id}
                                className="card_small transition_smooth"
                                onClick={() => handleSeePasoAnalisis(index)}
                            >
                                <p className="text_center">
                                    <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">
                                        {tema.numeroPaso}
                                    </span>
                                    {tema.nombreTema}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="width_100 justify_center wrap vertical_align">

                            <div className="width_100 justify_between vertical_align">
                                <div >
                                    <Button className="button_primary" onClick={handleHidePasoAnalisis} startIcon={<ArrowBackIcon />} >Volver a los pasos</Button>
                                </div>


                                <div className="card_small transition_smooth ">
                                    <p className="text_center">
                                        <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">
                                            {temas[temaSeleccionadoIndex].numeroPaso}
                                        </span>
                                        {temas[temaSeleccionadoIndex].nombreTema}
                                    </p>

                                </div>
                                <div >
                                    <Button className="button_terciary shadow_smooth" onClick={handleNextPaso} endIcon={<ArrowForwardIcon />} >Siguiente paso</Button>
                                </div>
                            </div>

                            <div className="descripcion_paso_container width_100">
                                <div dangerouslySetInnerHTML={{ __html: temas[temaSeleccionadoIndex].descripcionTema }}></div>
                            </div>

                            {temas[temaSeleccionadoIndex].numeroPaso === "6" && (
                                <Container className="margin_top_s ">

                                    {/* <div className="wrap">
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
                                    </div> */}
                                    <div className="width_100 margin_top_m margin_bottom_m">
                                    
                                    <TabAnalisis data={docsAnalisis} />

                                    </div>
                                    <div className="width_100 display_flex justify_center"> 
                                        <div className="width_80"> 
                                        <p className="margin_top_s">

                                        <strong>   Nota aclaratoria-Carácter no vinculante del análisis temático </strong>  <br/><br/>

                                            Los análisis temáticos han sido elaborados con fines informativos, de divulgación y de apoyo al estudio del desarrollo y evolución de la jurisprudencia de la Jurisdicción Especial para la Paz (JEP). Lo anterior, en cumplimiento de las funciones de la Relatoría General de la JEP definidas en el artículo 85 del Acuerdo ASP No. 001 de 2020 “Por el cual se adopta el Reglamento General de la Jurisdicción Especial para la Paz”.<br/>

                                            El contenido de los documentos no compromete la posición institucional de la JEP, ni constituye un pronunciamiento oficial de la misma. La interpretación ofrecida en estos análisis temáticos refleja únicamente un ejercicio técnico de análisis jurídico realizado por la Relatoría General de la JEP y no tiene efectos vinculantes para ningún sujeto procesal ni para terceros. En ningún caso, los análisis sustituyen las decisiones adoptadas por las autoridades judiciales competentes ni puede considerarse como precedente, fuente de derecho, directriz oficial o criterio interpretativo.<br/>
                                               
                                                Cualquier uso de los presentes análisis debe tener en cuenta su naturaleza meramente orientadora, y su consulta no exime del deber de verificar el contenido de las providencias judiciales originales ni de acudir a los medios oficiales para obtener información institucional.

                                        </p>
                                        </div>

                                    </div>

                                </Container>
                            )}



                        </div>
                    )}
                </div>
            </Container>



        </div>

    );
}