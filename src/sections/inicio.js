import React, { useEffect, useState, useRef, useContext } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relativ2.png';
import { Box, Container, Grid, Button, List, ListItem } from '@mui/material';
import SearchBar from '../components/searchBar';
import Carousel from '../components/carousel';
import CardDecision from '../components/cardDecision.js';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Masonry from 'masonry-layout';
import Context from '../context/context';


export default function Home() {
    const masonryGridRef = useRef(null);
    const navigate = useNavigate();
    const { verMasDecisionesRecientes } = useContext(Context);
    const goToMapaJurispudencialPage = () => {
        navigate('/mapa-jurisprudencial');
    };

    const goToBoletinesPage = () => {
        navigate('/boletines');
    };

    const macrocasos = [

        {
            id: 1,
            numeroCaso: "01",
            nombreCaso: "Secuestro",
        },

        {
            id: 2,
            numeroCaso: "02",
            nombreCaso: "Situación territorial de Nariño ",
        },

        {
            id: 3,
            numeroCaso: "03",
            nombreCaso: " “Falsos positivos” ",
        },

        {
            id: 4,
            numeroCaso: "04",
            nombreCaso: "Situación territorial de Urabá",
        },

        {
            id: 5,
            numeroCaso: "05",
            nombreCaso: "Situación territorial de Cauca y Valle",
        },
        {
            id: 6,
            numeroCaso: "06",
            nombreCaso: "Victimización de la UP",
        },
        {
            id: 7,
            numeroCaso: "07",
            nombreCaso: "Reclutamiento de niñas y niños",
        },
        {
            id: 8,
            numeroCaso: "08",
            nombreCaso: "Crímenes de la fuerza pública y paramilitares",
        },
        {
            id: 9,
            numeroCaso: "09",
            nombreCaso: "Crímenes contra Pueblos Étnicos"
        },
        {
            id: 10,
            numeroCaso: "10",
            nombreCaso: " Crímenes cometidos por Farc-EP",
        },
        {
            id: 11,
            numeroCaso: "11",
            nombreCaso: " Violencia de género, sexual y reproductiva",
        },


    ]

    let decisionesRecientes = [
        {
            id: 1,
            "fecha": "2023-06-15",
            "asunto": "En el asunto de héctor orlando bastidas bravo",
            "nombreDecision": "Sentencia SRT-ST-117-2024",
            "salaOSeccion": "Sala de Amnistía",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        },
        {
            id: 2,
            "fecha": "2022-03-18",
            "asunto": "En el asunto de martin gonzales leal",
            "nombreDecision": "Sentencia SRT-ST-120-2024",
            "salaOSeccion": "Sección de Revisión",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        },
        {
            id: 3,
            "fecha": "2021-06-22",
            "asunto": "En el asunto de juana castellanos rodriguez",
            "nombreDecision": "Sentencia SRT-ST-104-2024",
            "salaOSeccion": "Sala de Amnistía",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        },
        {
            id: 4,
            "fecha": "2023-08-11",
            "asunto": "En el asunto de mario leal prado",
            "nombreDecision": "Sentencia SRT-ST-104-2024",
            "salaOSeccion": "Sección de Revisión",
            "grupoPertence": "Grupo armado no firmante",
            "lugarHechos": "Acacías, Meta",
            "magistrado": "Augusto Rodriguez",
            "macrocaso": "08 ",
            "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
            "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

        },
    ]

    const boletinesMacrocaso = [
        {
            id: 1,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
            fecha: "2024-01",
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
            twitter: 'https://twitter.com/intent/tweet?text=Me gusta boletin_01_enero-2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf',
            mail: true,
            versionIngles: '',
            esEspecial: false,
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_01_enero_2024.png?ver=2.8'
        },

        {
            id: 7,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf',
            fecha: "2024-01",
            facebook: 'https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf',
            twitter: "https://twitter.com/intent/tweet?text=Me gusta boletin_05_edicion-especial_2024 &url=https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_05_edicion-especial_2024.pdf",
            mail: true,
            versionIngles: '',
            esEspecial: true,
            imagenPortada: 'https://relatoria.jep.gov.co/img/boletines/2024/boletin_05_especial_2024.png?ver=2.1'
        },


    ]

    const documentosSentencias = [
        {
            id: 1,
            nombreDocumento: 'Sentencia Interpretativa 1',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },


        {
            id: 2,
            nombreDocumento: 'Sentencia Interpretativa 2',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },

        {
            id: 3,
            nombreDocumento: 'Sentencia Interpretativa 3',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },

        {
            id: 4,
            nombreDocumento: 'Sentencia Interpretativa 3 (Reglas)',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },
        {
            id: 5,
            nombreDocumento: 'Sentencia Interpretativa 4',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },
        {
            id: 6,
            nombreDocumento: 'Sentencia Interpretativa 5',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },
        {
            id: 7,
            nombreDocumento: 'Sentencia Interpretativa 6',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },
        {
            id: 8,
            nombreDocumento: 'Sentencia Interpretativa 7',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },



    ]

    const documentosAdicionales = [


        {
            id: 1,
            nombreDocumento: 'Comisión de Género',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },
        {
            id: 2,
            nombreDocumento: 'Comisión de Étnica y Racial',
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/7/2/Sentencia-Interpretativa_TP-SA-SENIT-01_03-abril-2019.pdf'
        },


    ]

    const options = [''];

    useEffect(() => {
        if (masonryGridRef.current) {
          
          new Masonry(masonryGridRef.current, {
            itemSelector: '.masonry-item',
            columnWidth: '.masonry-item',
            gutter: 20,
            fitWidth: true,
          });
        }
      }, [verMasDecisionesRecientes]); 

    return (
        <div className="nowrap">
            <div className="header_container justify_center ">
                <Box className="header flex width_100">
                    <div className="margin_bottom_l width_100 justify_center align_center wrap margin_header">
                        <div className="width_100  justify_center align_center logo_container">
                            <img src={LogoRelati} className="logo_relati">
                            </img>
                        </div>

                        <h5 className="text_white width_100 text_center">Plataforma de búsqueda simple y especializada <br></br>
                            de las decisiones de la JEP </h5>

                    </div>
                </Box>


                <div className="search_home">

                    <div classname="search_size ">
                       <Container> 
                        <div>
                            <>
                                <Autocomplete className="margin_top_s "
                                    id="free-solo-demo"
                                    value
                                    freeSolo
                                    onChange
                                    options = {options}
                                    renderInput={(params) => <TextField {...params}  placeholder= "Busque por palabra clave, número de decisión, radicado...  " inputProps={{
                                        ...params.inputProps,
                                        maxLength: 80
                                    }} />}

                                />

                              
                                    <Button onClick className="autocomplete_button button_primary" startIcon={<SearchIcon />}>
                                        Buscar
                                    </Button>
                              
                        
                              
                                        <Button className="light_white text_blue autocomplete_button_help button_terciary">?</Button>
                                 
                            
                             
                                    <Button className="autocomplete_button_advance primary_blue text_white button_secondary_border">Búsqueda Avanzada</Button>
                              
                            </>
                        </div>
                        </Container>
                    </div>
                </div>
            </div>

            <Container item xs={12} sm={12} md={12} lg={12} xl={12} className="margin_top_xl " >
                <h2 className="text_bolder text_left padding_x">Decisiones recientes </h2>

                <div ref={masonryGridRef} className="masonry-grid width_100 wrap">
                {decisionesRecientes.map((decisiones, index) => (
                    // <div key={index} className="masonry-item wrap">
                        <CardDecision decisiones={decisiones}> </CardDecision>
                    // </div>
                ))}
                </div>

                {/* <div className="wrap ">


                        {decisionesRecientes.map((decisiones) => (

                            <CardDecision decisiones={decisiones}> </CardDecision>
                        ))}






                </div> */}

            </Container>


            <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_xl">
                <div className="align_center carousel_main_container " >
                    <div className="wrap text_carousel_container" >
                        <h2 className="align_center text_bolder"> Boletines</h2>
                        <h5 className=" align_center margin_top_s margin_bottom_m">Acceda al análisis de las decisiones más importantes de la JEP</h5>
                        <Button onClick={goToBoletinesPage} className="button_primary "> Ver todos los boletines</Button>
                    </div>
                    <div className="carousel_container">

                        <Carousel boletines={boletinesMacrocaso} />

                    </div>
                </div>



            </Container>

            <Container className="space_top ">
                <h2 className="justify_center text_bolder">Macrocasos</h2>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m">Conozca las últimas decisiones de cada macrocaso</h5>


                <div className="wrap transition_smooth">

                    {macrocasos.map((caso) => (

                        <div key={caso.id} className="card_small transition_smooth">
                            <p className="text_center">  Caso
                                <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">  {caso.numeroCaso} </span>
                                {caso.nombreCaso}
                            </p>
                        </div>


                    ))}
                </div>



                <div className="justify_center margin_top_m">

                    <Button className="button_primary"> Ver todos los casos</Button>
                </div>
            </Container>


            <Container className="margin_top_xl ">
                <h2 className="justify_center text_bolder text_center">Podcast
                    <br></br>Relatos de la JEP </h2>

                <h5 className="justify_center  align_center margin_top_s margin_bottom_m">Escuche la historia detrás de cada decisión de la JEP</h5>
                <iframe className="podcast_container shadow_smooth"
                    src='https://widget.spreaker.com/player?show_id=5701029&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true' width='100%' height='400px' frameborder='0'>

                </iframe>

            </Container>
            <Box className="secondary_blue section_blue width_100 margin_top_xl">
                <div className="width_100 justify_center">
                    <h1 className=" text_center text_white ">Mapa Jurisprudencial</h1>
                </div>
                <h5 className="width_100 text_center margin_bottom_m text_white text_bold title_description">Encuentre las decisiones de cada departamento (y municipio) colombiano navegando nuestro mapa interactivo</h5>
                <div className="justify_center margin_top_m">

                    <Button onClick={goToMapaJurispudencialPage} className="button_primary">Ver mapa</Button>
                </div>


            </Box>

            <Container item xs={12} sm={12} md={8} lg={8} xl={8} className="margin_top_xl " >
                <div className="wrap margin_bottom_xl">
                    <div className="container_40">
                        <h2 className="text_bolder text_left">Documentos</h2>
                        <h5>Conozca los documentos de Sentencias Interpretativas y Comisiones de Género </h5>
                    </div>
                    <div className="wrap container_60">
                        <ul>
                            {documentosSentencias.map((sentencia) => (
                                <li key={sentencia.id}>
                                    <a target="_blank" className="link_secondary text_capitalize" href={sentencia.pdf} >
                                        {sentencia.nombreDocumento}
                                    </a>

                                </li>
                            )

                            )}

                            <div className="separator_blue"> </div>

                            {documentosAdicionales.map((adicional) => (
                                <li key={adicional.id}>
                                    <a target="_blank" className="link_secondary text_capitalize" href={adicional.pdf}>
                                        {adicional.nombreDocumento}
                                    </a>

                                </li>
                            )

                            )}

                        </ul>



                    </div>
                </div>
            </Container>









        </div>

    );
}