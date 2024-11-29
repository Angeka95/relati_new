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
import Masonry from 'react-masonry-css';
import Context from '../context/context';
import { Link } from 'react-router-dom';
import ModalInfo from '../components/modal'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import macrocasoService from '../services/macrocaso.js';
import inithomeService from '../services/inithome.js';
import { documentosSentencias } from '../data/data_inicio.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import { obtenerPalabrasFromArrayObject } from '../helpers/utils.js';

export default function Home() {

    const [macrocasos, setMacrocasos] = useState([]);
    const [decisionesRecientes, setDecisionesRecientes] = useState([]);
    const [boletines, setBoletines] = useState([]);
    const [message, setMessage] = useState("");

    const setArrayDatosDecisiones = (arrData) => {
        const newArray = arrData.map(item => {
          return {
              id: item.id,
              fecha: item.fecha_providencia,
              asunto: item.asuntocaso,
              salaOSeccion: (item.hasOwnProperty("despacho")) ? item.despacho.nombre : "???",
              nombreDecision: item.nombre,
              tipoSujeto: (item.hasOwnProperty("tipopeti")) && (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "???",
              lugarHechos: "???",
              magistrado: ((item.hasOwnProperty("magistrado")) && (item.magistrado.length > 0 )) ? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "???", 
              caso: ((item.hasOwnProperty("caso")) && (item.caso !== null )) ? item.caso : "???", 
              resuelve: ((item.hasOwnProperty("getfichas")) && (item.getfichas.length > 0 ))? obtenerPalabrasFromArrayObject(item.getfichas[0].resuelve, "descripcion", null, false) : "???",
              hipervinculo:  `https://relatoria.jep.gov.co/${item.hipervinculo}`,
              hipervinculoFichaJuris: ((item.hasOwnProperty("getfichas")) && (item.getfichas.length > 0 ) && (item.getfichas[0].estado_id === 14)) ? `https://relatoria.jep.gov.co/downloadfichaext/${item.getfichas[0].id}` : "",
              estadoFichaJuris: ((item.hasOwnProperty("getfichas")) && (item.getfichas.length > 0 ) && (item.getfichas[0].estado_id !== null))  ?  item.getfichas[0].estado_id : "",
          }
        });
        return newArray;
    };

    const getMacrocasos = () => {
        macrocasoService
        .getDetailedMacrocasos()
        .then(response => {
            if((response.status_info.status === 200) && (response.data.length > 0)) {
                let arrMacrocasos = response.data.map(item => Object.values(item)[0]);
                setMacrocasos(arrMacrocasos);
                setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
            } else {
                setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
            }
        }
        )
        .catch(error => console.log(error));
    };

    useEffect(() => {
        if(macrocasos.length === 0){
            getMacrocasos();
        } 
    }, [macrocasos]);

    const getHomeData = () => {
        inithomeService
            .getHomeData()
            .then(response => {
                    if((response.status_info.status === 200) && (response.data.length > 0)) {
                        let arrBoletines = response.data[0].boletines.map(item => { return {
                            id : item.id,
                            titulo : item.titulo,
                            idioma : item.idioma,
                            nombre : item.providencias.nombre,
                            nombreWithExt : `${item.providencias.nombre}.pdf`,
                            pdf:  `https://relatoria.jep.gov.co/${item.providencias.hipervinculo}`,
                            fecha: item.anio, 
                            facebook: `https://www.facebook.com/sharer.php?u=https://relatoria.jep.gov.co/${item.providencias.hipervinculo}`,
                            twitter: `https://twitter.com/intent/tweet?text=${item.providencias.nombre}&url=${item.providencias.hipervinculo}`,
                            mail: true,  
                            versionIngles: `https://relatoria.jep.gov.co/documentos/providencias/17/23/en/boletin_eng_diciembre_2022.pdf`,
                            esEspecial: true, 
                            imagenPortada: (item.imagen !== null) ? `https://relatoria.jep.gov.co/${item.imagen}` : ``
                            }
                        });
                        const dataDecisiones = setArrayDatosDecisiones(response.data[0].providencias);
                        console.log("decisiones", dataDecisiones);
                        setDecisionesRecientes(dataDecisiones);
                        setBoletines(arrBoletines);
                        setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
                    } else {
                        setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
                    }
                }
            )
            .catch(error => console.log(error));
    };

    useEffect(() => {
            getHomeData();
            console.log("decisiones", decisionesRecientes);
            console.log("boletines", boletines);
    }, []);

    // Layout Masonry Decisiones Recientes
    const masonryGridRef = useRef(null);
    const breakpointColumnsObj = {
        default: 2,
        1100: 2,
        700: 1,
    };

    const { verMasDecisionesRecientes, setBusqueda, setVerTodasDecisiones } = useContext(Context);


    // Links otras secciones

    const navigate = useNavigate();

    const goToMapaJurispudencialPage = () => {
        navigate('/mapa-jurisprudencial');
    };

    const goToBoletinesPage = () => {
        navigate('/boletines');
    };

    const options = [
        { title: 'Competencia de la JEP' },
        { title: 'Competencia y Jurisdicción' },
        { title: 'Competencia de la Jurisdicción Ordinaria' },
        { title: 'Competencia Temporal de la JEP' },
        { title: 'Requisitos de la competencia' },
        { title: 'Competencia de las Salas de Justicia' },

    ];

    const inputRef = useRef(null);

    const [valueBar, setValueBar] = useState('');
    const updateSelectedValue = (event, value) => {
        setValueBar(value);
    };


    const [showAll, setShowAll] = useState(false);

    // Estado Boton ver todos los casos

    const handleSeeAllCases = () => {
        setShowAll(true);
    };

    // Función para manejar el clic en el botón "Ver menos"
    const handleSeeLessCases = () => {
        setShowAll(false);  // Cambia el estado a `false` para mostrar solo los primeros 6 casos
    };


    // Mostrar solo los primeros 6 casos, si `showAll` es false
    const casesToDisplay = showAll ? macrocasos : macrocasos.slice(0, 6);

    const handleSearch = () => {
        let searchValue = inputRef.current.querySelector('input').value;
        setBusqueda(searchValue);
        setVerTodasDecisiones(false)
    };


    // Modal 
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


     // Docs Comision de Genero
   
        const [isOpen, setIsOpen] = useState(false);
    
        const toggleContent = () => {
            setIsOpen(!isOpen);
        };



    // Masonry
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

                    <div className="search_size_ ">
                        <Container>
                            <div className="justify_center">
                                <div className="autocomplete_home_container ">
                                    <Autocomplete className="margin_top_s autocomplete_home"
                                        id="free-solo-demo"
                                        value={valueBar}
                                        freeSolo
                                        onChange={updateSelectedValue}
                                        options={options.map((option) => option.title)}
                                        renderInput={(params) => <TextField ref={inputRef} {...params} placeholder="Busque por palabra clave, número de decisión, radicado...  " inputProps={{
                                            ...params.inputProps,
                                            maxLength: 80
                                        }} />}

                                    />
                                    <Button className="light_white text_blue autocomplete_button_help button_terciary query_none" onClick={handleOpenModal}>?</Button>
                                    <ModalInfo openModal={openModal} handleCloseModal={handleCloseModal}> </ModalInfo> 
                                    <Link to="resultados-busqueda"> 
                                        <Button onClick={handleSearch} className="autocomplete_button_home button_primary z-index_front" startIcon={<SearchIcon />}>
                                            Buscar
                                        </Button>
                                    </Link> 


                                    {/*<Link to="busqueda-avanzada"> 
                                    <Button className="autocomplete_button_advance primary_blue text_white button_secondary_border">Búsqueda Avanzada</Button>
                                    </Link> */}
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>

            <Container item xs={12} sm={12} md={12} lg={12} xl={12} className="margin_top_xl " >
                <h2 className="text_bolder text_left padding_x">Decisiones recientes </h2>

                <Masonry ref={masonryGridRef} breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                >
                    {/* <div className='masonry-grid'> */}
                    {decisionesRecientes.map((decisiones, index) => (
                        // <Grid item key={index} xs={12} sm={6} md={6} lg={6} xl={6} className="masonry-item">
                        <CardDecision key={index} decisiones={decisiones}> </CardDecision>
                        // </Grid>
                    ))}
                    {/* </div> */}
                </Masonry>

                {/* <div className="wrap ">


                        {decisionesRecientes.map((decisiones) => (

                            <CardDecision decisiones={decisiones}> </CardDecision>
                        ))}






                </div> */}

            </Container>


            <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_xl">
            {( boletines.length === 0 ) ? 
                    <LinearWithValueLabel></LinearWithValueLabel>
                :
                <div className="align_center carousel_main_container " >
                    <div className="wrap text_carousel_container" >
                        <h2 className="align_center text_bolder"> Boletines</h2>
                        <h5 className=" align_center margin_top_s margin_bottom_m">Acceda al análisis de las decisiones más importantes de la JEP</h5>
                        <Button onClick={goToBoletinesPage} className="button_primary "> Ver todos los boletines</Button>
                    </div>
                    <div className="carousel_container">

                        <Carousel boletines={boletines} />

                    </div>
                </div>
            }
            </Container>

            <Container className="space_top "   id="seccion_caso">
                <h2 className="justify_center text_bolder">Macrocasos</h2>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m">Conozca las últimas decisiones de cada macrocaso</h5>


                <div className="wrap transition_smooth">

                    {casesToDisplay.map((caso) => (

                        <div key={caso.id} className="card_small transition_smooth">
                            <Link to={`/caso/${caso.id}`}>
                                <p className="text_center text_black" >  Caso
                                    <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">  {caso.numeroCaso} </span>
                                    {caso.nombreCaso}
                                </p>
                            </Link>
                        </div>


                    ))}
                </div>

                <div className="justify_center margin_top_m">
                    {!showAll ? (
                        <Button className="button_primary" onClick={handleSeeAllCases}>
                            Ver todos los casos
                        </Button>
                    ) : (
                        <Button className="button_primary" onClick={handleSeeLessCases}>
                            Ver menos casos
                        </Button>
                    )}
                </div>

            </Container>


            <Container className="margin_top_xl ">
                <h2 className="justify_center text_bolder text_center">Podcast
                    <br></br>Relatos de la JEP </h2>

                <h5 className="justify_center  align_center margin_top_s margin_bottom_m">Escuche la historia detrás de cada decisión de la JEP</h5>
                <div className="justify_center"> 
                <iframe className="podcast_container shadow_smooth "
                    src='https://widget.spreaker.com/player?show_id=5701029&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true' width='100%' height='400px' frameBorder='0'>

                </iframe>
                </div>

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
                    <div className="container_40 ">
                        <h2 className="text_bolder text_left">Documentos</h2>
                        <h5>Conozca los documentos de Sentencias Interpretativas y Comisiones de Género </h5>
                    </div>
                    <div className="wrap container_60">
                        <ul>
                            {documentosSentencias.map((adicional) => (
                                <li key={adicional.id}>
                                    <a target="_blank" className="link_secondary text_capitalize" href={adicional.pdf} >
                                        {adicional.nombreDocumento}
                                    </a>

                                </li>
                            )

                            )}
                            
                            <div className="separator_blue"> </div>
                            <li> 
                                <a className="link_secondary text_capitalize cursor_pointer" onClick={toggleContent}>
                                
                                Comisión de Género 
                                {isOpen ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                                
                                </a>
                                
                                {isOpen && (
                                <div  className="margin_top_s"> 
                                    <p>• <a target="_blank" className="link_secondary text_capitalize " href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_04-mayo-2022.pdf">  Concepto comisión de género (04 de Mayo de 2022) </a></p>
                                    <p>• <a target="_blank"  className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_28-febrero-2022.pdf">  Concepto comisión de género (28 de Febrero de 2022) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_24-enero-2022.pdf">  Concepto comisión de género (24 de enero de 2022) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_02-diciembre-2021.pdf">  Concepto comisión de género (02 de Diciembre de 2021) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_22-septiembre-2021.pdf">  Concepto comisión de género (22 de Septiembre de 2021) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_14-julio-2021.pdf">  Concepto comisión de género (14 de Julio de 2021) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_22-diciembre-2020.pdf">  Concepto comisión de género (22 de Diciembre de 2020) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_03-septiembre-2020.pdf">  Concepto comisión de género (03 de Septiembre de 2020) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_19-mayo-2020.pdf">  Concepto comisión de género (19 de Mayo de 2020) </a></p>
                                    <p>• <a target="_blank" className="link_secondary text_capitalize" href="https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_02-diciembre-2019.pdf">  Concepto comisión de género (02 de Diciembre de 2019) </a></p>

                                </div>
                                 )}

                            </li>

                            <li> 
                                <a className="link_secondary text_capitalize cursor_pointer" href="https://relatoria.jep.gov.co/documentos/providencias/15/11/Protocolo-001_comision-etnico-racial_05-junio-2019.docx">
                                Comisión de Étnica y Racial
                                </a>
                                

                            </li>

                            {/* {documentosAdicionales.map((adicional) => (
                                <li key={adicional.id}>
                                    <a target="_blank" className="link_secondary text_capitalize" href={adicional.pdf}>
                                        {adicional.nombreDocumento}
                                    </a>

                                </li>
                            )

                            )} */}

                        </ul>



                    </div>
                </div>
            </Container>









        </div>

    );
}