import React, { useEffect, useState, useRef, useContext } from 'react';
import '../App.css';
import LogoRelati from '../assets/images/logo_Relati.svg';
import { Box, Container, Grid, Button, List, ListItem, Tooltip, Alert } from '@mui/material';
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
import ModalFloat from '../components/modalFloat'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import macrocasoService from '../services/macrocaso.js';
import inithomeService from '../services/inithome.js';
import { documentosSentencias } from '../data/data_inicio.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import { obtenerPalabrasFromArrayObject } from '../helpers/utils.js';
import DocumentosComisionGenero from '../components/documentosComisionGenero.js';
import useSearchAIEnterKey from '../hooks/useSearchAIEnterKey.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import buscadorService from '../services/buscador.js';


export default function Home() {

    const [macrocasos, setMacrocasos] = useState([]);
    const [decisionesRecientes, setDecisionesRecientes] = useState([]);
    const [boletines, setBoletines] = useState([]);
    const [messageSearch, setMessageSearch] = useState({ message: "", classname: "" });
    const [message, setMessage] = useState("");

    const setArrayDatosDecisiones = (arrData) => {
        const newArray = arrData.map(item => {
          return {
              id: item.id,
              fecha: item.fecha_providencia,
              asunto: item.asuntocaso,
              salaOSeccion: (item.hasOwnProperty("despacho")) ? item.despacho.nombre : "",
              nombreDecision: item.nombre,
              tipoSujeto: (item.hasOwnProperty("tipopeti")) && (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "",
              lugarHechos: "",
              magistrado: ((item.hasOwnProperty("magistrado")) && (item.magistrado.length > 0 )) ? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "", 
              caso: ((item.hasOwnProperty("casopro") && (item.casopro.length > 0 ))) ? obtenerPalabrasFromArrayObject(item.casopro, "caso", null, false) : "", 
              resuelve: ((item.hasOwnProperty("getfichas")) && (item.getfichas.length > 0 ))? obtenerPalabrasFromArrayObject(item.getfichas[0].resuelve, "descripcion", null, false) : "",
              delitos: ((item.hasOwnProperty("delitos")) && (item.delitos.length > 0 ))? obtenerPalabrasFromArrayObject(item.delitos, "delito", null, true) : "",
              hipervinculo:  `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.hipervinculo}`,
              hipervinculoFichaJuris: ((item.hasOwnProperty("getfichas")) && (item.getfichas.length > 0 ) && (item.getfichas[0].estado_id === 14)) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadfichaext/${item.getfichas[0].id}` : "",
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
                        let arrBoletines = response.data[0].boletines.map(item => { 
                        let boletin =  {
                            id : item.id,
                            titulo : item.titulo.trim(),
                            idioma : item.idioma,
                            nombre : item.providencias.nombre,
                            nombreWithExt : `${item.providencias.nombre}.pdf`,
                            pdf:  `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.providencias.hipervinculo}`,
                            fecha: item.anio, 
                            facebook: `https://www.facebook.com/sharer.php?u=${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.providencias.hipervinculo}`,
                            twitter: `https://twitter.com/intent/tweet?text=${item.providencias.nombre}&url=${item.providencias.hipervinculo}`,
                            mail: true,  
                            versionIngles: `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/17/23/en/boletin_eng_diciembre_2022.pdf`,
                            esEspecial: true, 
                            imagenPortada: (item.imagen !== null) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.imagen}` : ``
                        };
                        boletin["anioMes"] = boletin["titulo"].split(" ")[2].concat("-01");       
                        return boletin;
                        });
                        const dataDecisiones = setArrayDatosDecisiones(response.data[0].providencias);
                        //console.log("decisiones", dataDecisiones);
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
            if(decisionesRecientes.length === 0) {
                getHomeData();
            }
    }, [decisionesRecientes]);

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
        window.scrollTo(0, 0);
    };

    const goToBoletinesPage = () => {
        navigate('/boletines');
        window.scrollTo(0, 0);
    };

    const goToLibrosPage = () => {
        navigate('/libros');
        window.scrollTo(0, 0);
    };

    const goToEnfoqueGeneroPage = () => {
        navigate('/enfoquegenero');
        window.scrollTo(0, 0);
    };


    /* Autocompletar */
    
    const inputRef = useRef(null);
    const [valueBar, setValueBar] = useState('');
    const [valAutoComplete, setValAutoComplete] = useState('');
    const [options, setOptions] = useState([]);

    // Captura el valor en el componente Autocomplete
    const updateSelectedValue = (event, value) => {
        setValueBar(value);
    };
    
    // Esta funcion adjunta al onChange de TextField permite obtener lista de opciones que el usuario pueda elegir
    const executeAutoComplete = (event) => {
        setValAutoComplete(event.target.value);
    };
    
    const getListaBuscadorAutocompletar = (expresion) => {
        buscadorService
            .getBuscadorListaAutocompletar(expresion)
            .then(response => {
                let optionsAutocomplete = response.data.map(item => {
                    return { title: item.value };
                });
                setOptions(optionsAutocomplete);
             }
            )
            .catch(error => console.log(error));
    }; 
    
    // Este Hook permite actualizar el valor de estado options cada vez que se cambia el valor del input
    useEffect((() => {
        if ((valAutoComplete !== null ) && (valAutoComplete.length >= 3)) {
             setTimeout(() =>{ 
                getListaBuscadorAutocompletar(valAutoComplete);
             }, 1200);
        }
    }), [valAutoComplete]);
    
    /* Fin Autocompletar */
    
    /* Terminos Mas Buscados */
    
    const [terminosMasBuscados, setTerminosMasBuscados] = useState([]);
    
    const getTerminosMasBuscados = () => {
        inithomeService
            .getTerminosMasBuscados()
            .then(response => {
                setTerminosMasBuscados(response.data);
             }
            )
            .catch(error => console.log(error));
    }; 
    
    useEffect((() => {
        if (terminosMasBuscados.length === 0 ) {
            getTerminosMasBuscados();
        }
    }), [terminosMasBuscados])
        
    /* Fin Terminos Mas Buscados */

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
    const casesToDisplay = showAll ? macrocasos : macrocasos.slice(0, 11);

    const handleSearch = (e) => {
        
        let message_ = { message: "", classname: "" };
        let searchValue = inputRef.current.querySelector('input').value;
        
        if(searchValue.length === 0){
            message_ = { message: "Busque por palabras clave, número de decisión, radicado...", classname: "warning" };
            setTimeout(function(){ 
                setMessageSearch(message_);
            }, 300);
            setTimeout(() => {
                setMessageSearch({ message: "", classname: "" }); 
            }, 6000);
        
        } else {
            setBusqueda(searchValue);
            setVerTodasDecisiones(false);

            const params = new URLSearchParams({ string: encodeURIComponent(searchValue) });
            navigate(`/resultados-busqueda?${params.toString()}`);
        }
        
    };
    
    const keypressEnterResultadosBusqueda = (event) => {
    
        const formAutocomplete = document.querySelector('.autocomplete_home_container');
        const inputAutocomplete = formAutocomplete.querySelector('.autocomplete_home input');
        const buttonAutocomplete = formAutocomplete.querySelector('button.searchAIButton');

        if (event.key === "Enter") {    
            let message_ = { message: "", classname: "" };
            if (inputAutocomplete.value.trim() !== "") {
                buttonAutocomplete.click(); 
            } else {
                message_ = { message: "Busque por palabras clave, número de decisión, radicado...", classname: "warning" };
            }
            setTimeout(function(){ 
                setMessageSearch(message_);
            }, 300);
            setTimeout(() => {
                setMessageSearch({ message: "", classname: "" }); 
            }, 1500);
        } 
        
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

    // Modal flotante
    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleToggleModalVisibility = (e) => {
        e.preventDefault(); 
        setIsModalVisible(!isModalVisible); 

        //  if (!isModalVisible) {
        //     setTimeout(() => {
        //       setIsModalVisible(false); 
        //      }, 15000); 
        //    }
        };

        //  useEffect(() => {
        //      if (isModalVisible) {
            
        //       const timer = setTimeout(() => {
        //         setIsModalVisible(false);
        //       }, 15000);
        
        //        return () => clearTimeout(timer);
        //      }
        //    }, [isModalVisible]);


          const dataModal = [
            {
              titulo: "JEP lanza el libro: ",
              descripcion: "‘Código de la Jurisdicción Especial para la Paz’",
              urlImagen: "https://pbs.twimg.com/media/FsUUOfdXoAAxiKZ.jpg",
              link: `${process.env.REACT_APP_API_SERVER_DOMAIN}/`
            },
            {
              titulo: " título 2",
              descripcion: "descripción 2",
              urlImagen: "https://upload.wikimedia.org/wikipedia/commons/9/9c/LogoJEP.jpg",
              link: `${process.env.REACT_APP_API_SERVER_DOMAIN}/`
            },
            {
                titulo: " título 3",
                descripcion: "descripción 3",
                urlImagen: "https://pbs.twimg.com/media/FsUUOfdXoAAxiKZ.jpg",
                link: `${process.env.REACT_APP_API_SERVER_DOMAIN}/`
              },
            {
                titulo: " título 4",
                descripcion: "descripción 4",
                urlImagen: "https://upload.wikimedia.org/wikipedia/commons/9/9c/LogoJEP.jpg",
                link: `${process.env.REACT_APP_API_SERVER_DOMAIN}/`
            },
     
          ];

          const [currentIndex, setCurrentIndex] = useState(0);

          const handleNext = () => {
            if (currentIndex < dataModal.length - 1) {
              setCurrentIndex(currentIndex + 1); // 
            } else {
                setCurrentIndex(0);
              }
          };
          
          const handlePrevious = () => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1); // 
            }
            else {
                setCurrentIndex(dataModal.length - 1);
              }
          };

          useEffect(() => {
            const timer = setTimeout(() => {
              handleNext(); 
            }, 3000); 
        
            return () => clearTimeout(timer);
          }, [currentIndex]); 

        //   Libros

          const libros = [
            {
                id : 1,
                pdf: '${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/CODIGO_JURISDICCION_ESPECIAL_PAZ_1A_ED.pdf', 
                fecha: "2025-01", 
                imagenPortada: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_codigo_JEP_c.png`
             },
            {
                id : 2,
                pdf: '${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/TOMO_1_Las-SENIT-1-2-3.pdf', 
                fecha: "2024-01", 
                imagenPortada: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/TOMO_1_Las-SENIT-1-2-3.jpg`
             },
             {
                id : 3,
                pdf: '${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/Tomo_2_lineamientos_analisis_tematico.pdf', 
                fecha: "2024-01", 
                imagenPortada: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_tomo_II.jpg`
             },

             {
                id : 4,
                pdf: '${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/Tomo_III_Macrocasos_versión_final.pdf', 
                fecha: "2025-01", 
                imagenPortada: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_tomo3.jpeg`
             },

        
        
        ]

    return (
        <div className="nowrap">
            {/* {isModalVisible && (
            <div className="modal_floating">
                <div className="width_100">
                    <div className="modal_float_date versalitas">
                        12 enero 2024
                    </div>

                </div>
                <div className="width_100">
                <Tooltip title="Ocultar">
                        <a className="modal_float_accordion versalitas" href="" onClick={handleToggleModalVisibility}>
                         <KeyboardArrowRightIcon/>
                        </a>
                </Tooltip>
                  

                </div>
    
                <div className='display_flex flex_wrap'> 
                    
                        <div className="modal_float_img ">
                            <img src={dataModal[currentIndex].urlImagen} alt="novedades en Relati" className="modal_float_img_content" />
                         </div>
                         <div className="modal_float_text">
                            <a className="link_terciary" href={dataModal[currentIndex].link}> 
                                <p className="text_bolder modal_single-line_text">{dataModal[currentIndex].titulo} </p> 
                                <p className="display_block modal_two-line_text"> {dataModal[currentIndex].descripcion}</p>
                            </a>
                         </div>

                </div>
            

               <div className="modal_separator"></div>

                
                <div className="display_flex justify_between">
                    <div className="width_50">
                    <p className="versalitas margin_top_xs text_bold">lo más destacado</p>

                    </div>
                    <div className="width_50 display_flex justify_end"> 
                        <a className="modal_float_button" onClick={handlePrevious}><KeyboardArrowLeftIcon/> </a> 
                        <a className="modal_float_button" onClick={handleNext}><KeyboardArrowRightIcon/> </a>
                    </div>

                </div>
                 

             </div> 
             )} */}
              {/* {!isModalVisible && (
            <div className="modal_floating_expand">
                <div className="width_100">
                    <Tooltip title="Expandir">
                            <a className="modal_float_accordion versalitas" href="" onClick={handleToggleModalVisibility}>
                            <KeyboardArrowLeftIcon/>
                            </a>
                    </Tooltip>
                    
                </div>
            </div>
              )} */}


            <div className="header_container justify_center ">
                <Box className="header flex width_100">
                    <div className="margin_bottom_l width_100 justify_center align_center wrap margin_header">
                        <div className="width_100  justify_center align_center logo_container">
                            <img src={LogoRelati} className="logo_relati">
                            </img>
                        </div>

                        <h5 className="text_white width_100 text_center text_bolder text_header">Plataforma de búsqueda simple y especializada <span className="display_header">
                            de las decisiones de la Jurisdicción Especial para la Paz </span></h5>

                    </div>

                </Box>

                <div className="search_home">
                    <div className="search_size_">
                        <Container>
                            <div className="justify_center">
                                <div className="autocomplete_home_container">
                                    <Autocomplete className="margin_top_s autocomplete_home"
                                        id="free-solo-demo"
                                        value={valueBar}
                                        freeSolo
                                        onChange={updateSelectedValue}
                                        onKeyDown={keypressEnterResultadosBusqueda}
                                        options={options.map((option) => option.title)}
                                        renderInput={(params) => 
                                            <TextField ref={inputRef} {...params} placeholder="Busque por palabras clave, número de decisión, radicado...  " inputProps={{
                                            ...params.inputProps,
                                            maxLength: 400
                                            }} 
                                            onChange={executeAutoComplete}
                                            />
                                        }
                                    />
                                    {/*<Button className="light_white text_blue autocomplete_button_help button_terciary query_none" onClick={handleOpenModal}>?</Button>*}
                                    {/*<ModalInfo openModal={openModal} handleCloseModal={handleCloseModal}> </ModalInfo>*/} 
                                    {/*<Link to="resultados-busqueda?string=caso"> */}
                                        <Button onClick={handleSearch} className="searchAIButton autocomplete_button_home button_primary z-index_front" startIcon={<SearchIcon />}>
                                            Buscar
                                        </Button>
                                    {/*</Link>*/} 
                                    <div className="texto_ver_todas_las_decisiones margin_bottom_m text_center_mobile">
                                        <p>¿No encuentra lo que busca?  
                                        <Link to="ver-todas-las-decisiones" className="link_primary margin_left_xs"> 
                                        Ver todas las decisiones
                                        </Link>
                                        </p>
                                    </div>
                                    <Link to="busqueda-avanzada"> 
                                    <Button className="autocomplete_button_advance primary_blue text_white button_secondary_border">Búsqueda Avanzada</Button>
                                    </Link>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
            <Container xs={12} sm={12} md={12} lg={12} xl={12} className='alert_search_message_container'>
                <div className="justify_start padding_x alert_search_message">
                {(messageSearch.message.trim() !== '') && 
                                <Alert variant="outlined" severity={messageSearch.classname}>
                                    {messageSearch.message}
                                </Alert>
                }
                </div>
            </Container>

            
            <Container xs={12} sm={12} md={12} lg={12} xl={12} className="margin_top_xlx">
                <h2 className="text_bolder text_left padding_x  margin_top_m title_mobile text_center_mobile">Términos más buscados</h2>
                {(terminosMasBuscados.length === 0 ) ?
                        <LinearWithValueLabel></LinearWithValueLabel>
                    :
                    <>
                        <div className="margin_eje_xm">
                            {terminosMasBuscados.map((item, k) => (
                                <div key={k} className="width_100 "> 
                                 <Button className="link_secondary text_capitalize text_left" startIcon={<SearchIcon />} href={`/resultados-busqueda?string=${item.terminos.toUpperCase()}`}>{item.terminos.toUpperCase()}</Button> 
                                </div> 
                            ))}
                        </div>
                    </>
                }
            </Container>
           
            <Container xs={12} sm={12} md={12} lg={12} xl={12} className="margin_top_xl">
                <h2 className="text_bolder text_left padding_x text_center_mobile  title_recientes">Decisiones recientes </h2>
                {(terminosMasBuscados.length === 0 ) ?
                        <LinearWithValueLabel></LinearWithValueLabel>
                    :
                        <Masonry ref={masonryGridRef} breakpointCols={breakpointColumnsObj} className="my-masonry-grid ">
                            {/* <div className='masonry-grid'> */}
                            {decisionesRecientes.map((decisiones, index) => (
                                // <Grid item key={index} xs={12} sm={6} md={6} lg={6} xl={6} className="masonry-item">
                                <CardDecision key={index} decisiones={decisiones}> </CardDecision>
                                // </Grid>
                            ))}
                            {/* </div> */}
                        </Masonry>
                }
            </Container>

            <Container xs={12} sm={12} md={8} lg={8} xl={8} className="margin_top_xl " >
                {(terminosMasBuscados.length === 0 ) ?
                        <div className="wrap margin_bottom_xl">
                             <h2 className="text_bolder text_left padding_x text_center_mobile  title_recientes">Documentos</h2>
                             <LinearWithValueLabel></LinearWithValueLabel>
                        </div>
                    :
                        <div className="wrap margin_bottom_xl">
                            <div className="container_40 ">
                                <h2 className="text_bolder text_left text_center_mobile">Documentos</h2>
                                <h5>Conozca los documentos de Sentencias Interpretativas y Comisiones de Género </h5>
                                <div className="separator"> 
                                </div> 
                                <h5 className='margin_top_s margin_bottom_s'> Encuentre las decisiones de la JEP y actividad judicial basadas en enfoque de género </h5>
                                <Button onClick={goToEnfoqueGeneroPage} className="button_primary " >
                                     Ver decisiones 
                                </Button>
                            </div>
                            <div className="wrap container_60">
                                <ul>
                                    {documentosSentencias.map((adicional) => (
                                        <li key={adicional.id}>
                                            <a target="_blank" rel="noreferrer" className="link_secondary text_capitalize" href={adicional.pdf} >
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
                                        <>
                                        <DocumentosComisionGenero />
                                        </>
                                        )}
                                    </li>
        
                                    <li> 
                                        <a className="link_secondary text_capitalize cursor_pointer" href="https://relatoria.jep.gov.co/documentos/providencias/15/11/Protocolo-001_comision-etnico-racial_05-junio-2019.docx">
                                        Comisión de Étnica y Racial
                                        </a>
                                    </li>
        
                                    {/* {documentosAdicionales.map((adicional) => (
                                        <li key={adicional.id}>
                                            <a target="_blank" rel="noreferrer" className="link_secondary text_capitalize" href={adicional.pdf}>
                                                {adicional.nombreDocumento}
                                            </a>
        
                                        </li>
                                    )
        
                                    )} */}
        
                                </ul>
                            </div>
                        </div>
                }        
            </Container>


            <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_xl">
            {( boletines.length === 0 ) ? 
                 <>
                     <h2 className="text_bolder text_left padding_x text_center_mobile  title_recientes">Boletines</h2>
                     <LinearWithValueLabel></LinearWithValueLabel>
                </>
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

            <Container className="space_top " id="seccion_caso">
                {( casesToDisplay.length === 0 ) ? 
                    <>
                      <h2 className="justify_center text_bolder">Macrocasos</h2>
                      <LinearWithValueLabel></LinearWithValueLabel>
                    </>
                :    
                <>
                <h2 className="justify_center text_bolder">Macrocasos</h2>
                <h5 className="justify_center  align_center margin_top_s margin_bottom_m text_center_mobile">Conozca las últimas decisiones de cada macrocaso</h5>
                <div className="wrap transition_smooth">
                    {casesToDisplay.map((caso) => (

                        <div key={caso.id} className="card_small transition_smooth">
                            <Link to={`/caso/${caso.id}`}  onClick={() => window.scrollTo(0, 0)}>
                                <p className="text_center text_black" >  Caso
                                    <span className="text_big display_block margin_top_s margin_bottom_s text_green text_bolder">  {caso.numeroCaso} </span>
                                    {caso.nombreCaso}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* <div className="justify_center margin_top_m">
                    {!showAll ? (
                        <Button className="button_primary" onClick={handleSeeAllCases}>
                            Ver todos los casos
                        </Button>
                    ) : (
                        <Button className="button_primary" onClick={handleSeeLessCases}>
                            Ver menos casos
                        </Button>
                    )}
                </div> */}
                </>
            }
            </Container>

            <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_xxl">
            {( boletines.length === 0 ) ? 
                    <>
                     <h2 className="text_bolder text_left padding_x text_center_mobile  title_recientes">Libros</h2>
                     <LinearWithValueLabel></LinearWithValueLabel>
                    </>
                :
                <div className="align_center carousel_main_container " >
                    <div className="wrap text_carousel_container" >
                        <h2 className="align_center text_bolder"> Libros</h2>
                        <h5 className=" align_center margin_top_s margin_bottom_m">Explore nuestros libros que cuentan con la colaboración de magistradas, magistrados y profesionales de la JEP</h5>
                        <Button onClick={goToLibrosPage} className="button_primary "> Ver todos los libros</Button>
                    </div>
                    <div className="carousel_container">

                        <Carousel boletines={libros} />

                    </div>
                </div>
            }
            </Container>


            <Container className="margin_top_xl ">
                <h2 className="justify_center text_bolder text_center ">Podcast
                    <br></br>Relatos de la JEP </h2>

                <h5 className="justify_center  align_center margin_top_s margin_bottom_m text_center_mobile">Escuche la historia detrás de cada decisión de la JEP</h5>
                <div className="justify_center"> 
                <iframe className="podcast_container shadow_smooth "
                    src="https://open.spotify.com/embed/show/5hEeZojgIOkXfOkGxDDsiS?utm_source=generator&theme=0" width='100%' height='400px' frameBorder='0'>

                </iframe>
                {/*<iframe className="podcast_container shadow_smooth "
                    src='https://widget.spreaker.com/player?show_id=5701029&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true' width='100%' height='400px' frameBorder='0'>

                </iframe>*/}    
                </div>
            </Container>
            
            <Box className="secondary_blue section_blue width_100 margin_top_xl margin_bottom_s">
                <div className="width_100 justify_center">
                    <h1 className=" text_center text_white ">Mapa Jurisprudencial</h1>
                </div>
                <h5 className="width_100 text_center margin_bottom_m text_white text_bold title_description">Encuentre las decisiones de cada departamento (y municipio) colombiano navegando nuestro mapa interactivo</h5>
                <div className="justify_center margin_top_m">

                    <Button onClick={goToMapaJurispudencialPage} className="button_primary">Ver mapa</Button>
                </div>


            </Box>

           









        </div>

    );
}