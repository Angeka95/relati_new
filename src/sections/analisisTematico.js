import React, { useEffect, useState } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relativ2.png';
import { Box, Container, Grid, Button } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Analisis() {

    const temas = [

        {
            id: 1,
            numeroPaso: "1",
            nombreTema: "Definición y priorización de los temas",
            descripcionTema: `Esta es una labor preparatoria que corresponde al responsable de la elaboración de cada línea jurisprudencial, con la validación interna por parte de la Relatora General, donde se definen temas generales de interés que se abordan en decisiones judiciales de la JEP y que orientarán la posterior obtención, consolidación y análisis de providencia que se desarrollarán a través de la línea jurisprudencial.<br> </br>

            El tema, por tanto, se puede identificar de la relación que se haga entre los hechos que se exponen en la sentencia o de las pretensiones de cada actuación y su relación con la parte considerativa, en donde se encuentran las razones directas bajo las cuales se aprueba el fallo.<br> </br>

            Este ejercicio preparatorio no se reflejaría en un contenido específico del módulo de líneas jurisprudenciales de Relati, sino que corresponde al trabajo previo a la elaboración de los productos que allí se publicarían.<br> </br>

            En términos de información empleada, la priorización de temas tiene como insumos:<br> </br>

            <ul> 
            <li> Revisión de material bibliográfico interno de la JEP (cuyos ejemplares en formato digital se encuentran al acceso desde la página web oficial);</li>
            <li>Estudio especial de las sentencias interpretativas (SENIT) de la JEP (cuya consulta se puede hacer a través de Relati);</li>
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
            descripcionTema: `Esta es otra labor preparatoria a cargo de responsable de la elaboración de cada línea jurisprudencial, con la validación interna por parte de la Relatora General. Este ejercicio preparatorio no se reflejaría en un contenido específico del módulo de líneas jurisprudenciales de Relati, sino que corresponde al trabajo previo a la elaboración de los productos que allí se publicarían.<br> </br>

                En la fase correspondiente al análisis preliminar de las decisiones judiciales es necesario realizar una búsqueda de información que permita delimitar los temas y subtemas que se pretendan estudiar. Teniendo en cuenta que el tema puede ser entendido como el asunto general sobre el que trata la decisión judicial y que, a su vez, permite reunir los supuestos de hecho que conforman el problema jurídico, es preciso definir la categoría de los subtemas.<br> </br>

                Los subtemas constituyen los diferentes asuntos que permitirán agrupar y delimitar las diferentes decisiones que conformarán la línea. Para esto, se definen categorías que permitan agrupar las decisiones que pertenecen al mismo tema general, acotandolas de acuerdo a su contenido y asuntos desarrollados en la parte motiva y en la parte resolutiva.<br> </br>

                En términos de información empleada, la concreción de subtemas tiene como insumos:<br> </br>
                <ul> 
                <li>
                Estudio de autos y sentencias de la JEP (cuya consulta se puede hacer a través de Relati).
                </li>
                </ul>            `
        },

        {
            id: 3,
            numeroPaso: "3",
            nombreTema: "Construcción del Banco de decisiones judiciales relevantes",
            descripcionTema: `Una vez se cuenta con la definición de temas y subtemas, validados desde la Relatoría General, se puede proceder a la recopilación y consolidación de decisiones judiciales a través de la construcción del Banco de decisiones relevantes.<br> </br>

                Este ejercicio preparatorio sí se reflejaría en un contenido específico en el módulo de líneas jurisprudenciales, el cual corresponde a la compilación de las decisiones utilizadas para la elaboración de la línea, identificación de Sala o Sección que las emite, fecha de emisión, número de la decisión, síntesis de problemas y tésis jurídicas.<br> </br>

                Para la administración de las decisiones recopiladas se crea una carpeta de acuerdo con el tema/subtema (por ejemplo: decisiones sobre factores de competencia de la JEP), donde se guardan los archivos con los textos de todas las decisiones.<br> </br>

                En este sentido, se crea tanto una base de datos, como un repositorio con los documentos de los autos y sentencias.<br> </br>

                En términos de información empleada, la concreción de subtemas tiene como insumos:<br> </br>
                <ul>
                <li>Obtención de decisiones de la Corte Constitucional a través de su Relatoría .</li>
                <li>Obtención de decisiones de la JEP a través de las herramientas de búsqueda (búsqueda general, búsqueda avanzada, palabras clave) dispuestas en Relati.</li>
                <li>Obtención de decisiones de la JEP a través del espacio de “Boletines de jurisprudencia” en Relati. </li>
                </ul>`
        },

        {
            id: 4,
            numeroPaso: "4",
            nombreTema: "Formulación del problema jurídico",
            descripcionTema: `A partir del proceso de revisión de las decisiones judiciales, es necesario desarrollar la construcción de un problema jurídico, correspondiente a la pregunta que se formula a partir de los hechos del caso, las pretensiones y la normativa aplicable. En la medida en que se trata del punto de partida para el análisis, el problema jurídico constituye información que se espera hacer explícita dentro del módulo de líneas jurisprudenciales, como parte de los parámetros iniciales que se ofrezcan al usuario para consultar cada línea publicada.
                <br> </br>
                El problema jurídico que orienta la línea jurisprudencial debe ser: a) similar a los problemas jurídicos de las sentencias a analizar y b) suficientemente general para reunir los casos que pueden considerarse parte del mismo escenario.
                <br> </br>
                Con el objeto de orientar al lector acerca de la necesidad y pertinencia de la elaboración de la línea jurisprudencial, resulta importante introducir la argumentación a través de la cual se justifique el problema jurídico planteado. Así, se da cuenta de la importancia de este a la luz de los principios, estructura, esquema procesal, instituciones aplicables y normatividad relevante de la JEP.
                <br> </br>
                En términos de información empleada, la formulación del problema jurídico tiene como insumos:
                <br> </br>
                <ul>
                <li>
                Información recopilada en el Banco de decisiones: Textos de autos y sentencias; y base de datos.
                </li>
                </ul> 
                `
        
            },

        {
            id: 5,
            numeroPaso: "5",
            nombreTema: "Análisis de las decisiones judiciales: Análisis dinámico y estático",
            descripcionTema: `Con la compilación de las decisiones y la definición del problema jurídico, se procede a su análisis, en función del problema jurídico definido. Este ejercicio corresponde a la base del contenido que se publicaría en el módulo de líneas en Relati, toda vez que hace parte de los documentos analíticos de las líneas jurisprudenciales.
                <br> </br>
            El análisis de decisiones se hace a través de dos tipos de análisis: i) el análisis dinámico; y ii) el análisis estático.
            `
        },
        {
            id: 6,
            numeroPaso: "6",
            nombreTema: "Identificación de la decisión arquimédica Documento analítico (Línea)",
            descripcionTema: `
            Consiste en el análisis de las posiciones planteadas en las decisiones analizadas a lo largo del tiempo. De esta forma, se hace una aproximación a la evolución el precedente a lo largo del tiempo. Para este propósito, se parte de dar un valor a cada decisión estudiada de acuerdo con el organismo que la emite, su naturaleza, la recurrencia con la que es citada dentro de las decisiones que conforman el Banco de decisiones.
            <br> </br>
            Con base en dicha valoración, que implica una aproximación a la importancia de cada decisión, se empieza por estudiar empezando por las decisiones con mayor puntaje, identificando en su contenido la argumentación que se considera ratio decidendi o ‘razón de la decisión’ y las subreglas. Estas últimas permiten entender la tesis jurídica para cada caso, sistematizando así esta información para cada decisión analizada. De esta forma, se puede identificar si las decisiones presentan variaciones en el alcance o interpretación de las instituciones involucradas en la respuesta al problema jurídico, lo cual permitirá construir un resultado gráfico de la línea jurisprudencial.
            <br> </br>
            Para tener mayor claridad en las circunstancias que median en el desarrollo del precedente a lo largo del tiempo, es importante contextualizar las decisiones dentro del marco normativo aplicable en el momento de ser proferidas, teniendo en cuenta que las leyes, decretos, resoluciones y actos administrativos internos de la JEP pueden incidir, a medida que son expedidos, sobre giros o precisiones en el precedente jurisprudencial.
            `

        },
        {
            id: 7,
            numeroPaso: "7",
            nombreTema: " Análisis estático de la decisión de apoyo o punto arquimédico",
            descripcionTema: `
            Habiendo culminado el análisis dinámico y de acuerdo con la decisión que se hubiera identificado como punto de apoyo sobre el cual se construyen las tendencias de decisión en la línea jurisprudencial, o punto arquimédico, se profundiza sobre la argumentación a través de la cual se llega a la tesis jurídica en dicha decisión, teniendo en cuenta su contexto dentro del precedente judicial identificado a través de la línea.
            <br> </br>
            Para hacer este análisis, se debe: i) identificar el relacionamiento entre el problema y la tesis jurídica; ii) identificar los argumentos de la decisión que suplen vacíos dentro del precedente; iii) identificar los argumentos que siguen o respetan el precedente; y iv) identificar los argumentos que se apartan del precedente.
            <br> </br>
            En términos de información empleada, el análisis de decisiones judiciales tiene como insumos:
            <br> </br>
            <ul>
            <li>Información sobre instrumentos normativos expedidos por autoridades externas a la JEP: Actos legislativos (reformas constitucionales), Leyes, Decretos; cuya consulta se puede hacer a través de espacios de consulta como la página web del Senado de la República , SUIN-Juriscol , Gestor normativo del Departamento Administrativo de la Función Pública.</li>
            <li>Información sobre instrumentos normativos expedidos dentro de la JEP:</li>
            <li>Información recopilada en el Banco de decisiones: Textos de autos y sentencias; y base de datos.</li>
            </ul>
            `
        },
        {
            id: 8,
            numeroPaso: "8",
            nombreTema: "Construcción de la tesis jurisprudencial (Respuesta)",
            descripcionTema: `
            Como resultado del ejercicio de análisis conducente a la elaboración de la línea jurisprudencial, se espera la elaboración de una serie de documentos o resultados que plasmen las metodologías, procedimientos, selección de decisiones, procesamiento de información y estudio tendiente a la determinación y solución del problema jurídico correspondiente; así como para transmitir los resultados y conclusiones del trabajo llevado a cabo a los destinatarios que se determinen.
            `
        },
        {
            id: 9,
            numeroPaso: "9",
            nombreTema: "Documento analítico (Línea)",
            descripcionTema: `

            `
        },



    ]

    const [temaSeleccionadoIndex, setTemaSeleccionadoIndex] = useState(null);
    const [showPasoAnalisis , setShowPasoAnalisis] = useState(false);



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
  };


    return (
        <div className="descripcion_nowrap margin_bottom_xl">

            <Container className="margin_top_l ">
                <h1 className="justify_center text_bolder">Análisis Temático de Decisiones</h1>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m text_center">Explore como se realiza el análisis sobre temas jurídicos de la JEP, basado en el estudio de sus decisiones judiciales e instrumentos normativos aplicables.   </h5>


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
                    <Button className="button_primary" onClick={handleHidePasoAnalisis} startIcon={ <ArrowBackIcon />} >Volver a los pasos</Button>
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
                    <Button className="button_terciary shadow_smooth" onClick={handleNextPaso} endIcon={ <ArrowForwardIcon />} >Siguiente paso</Button>
                </div>
            </div> 
            
            <div className="descripcion_paso_container width_100">
                <div dangerouslySetInnerHTML={{__html: temas[temaSeleccionadoIndex].descripcionTema}}></div>
            </div>

            {temas[temaSeleccionadoIndex].numeroPaso === "9" && (
            <Container className="margin_top_s ">
        
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
              )}

           

        </div>
      )}
    </div>
            </Container>

        

        </div>

    );
}