import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Stack, Pagination, PaginationItem, List, ListItem, Button, Box, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardSearch from '../components/cardSearchResults.js';
import SearchBarSmall from '../components/searchBarSmall.js';
import SortIcon from '@mui/icons-material/Sort';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EditCalendar } from '@mui/icons-material';
import Context from '../context/context';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FilterShort from './filterShort';
import FilterListIcon from '@mui/icons-material/FilterList';
import LinearWithValueLabel from '../components/linearProgress.js';
import tesauroService from './../services/tesauro.js';

export default function Card({ selectedFilters, isListSmall, selectedTerm, isLargeResult, isExternalFilters }) {

    const [datos, setDatos] = useState([
            {
                id: 1,
                "fecha": "2023-06-15",
                "asunto": "En el asunto de héctor orlando bastidas bravo",
                "salaOSeccion": "Sala de Reconocimiento",
                "nombreDecision": "Sentencia SRT-ST-117-2024",
                "delito": "Desaparición Forzada",
                "departamento": "Meta",
                "municipio": "Acacias",
                "anioHechos": "2016",
                "organo": "Lorem ipsum",
                "tipo": "Lorem ipsum",
                "radicado": "Lorem ipsum",
                "procedimiento": "Lorem ipsum dolor sit amet",
                "expediente": "Lorem ipsum dolor",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min...",
                "magistrado": "Lily Andrea Rueda Guzmán",
                "actor": "Lorem ipsum dolor sit amet",
                "tipoSujeto": "Lorem ipsum dolor sit amet",
                "accionadoVinculado": "Lorem ipsum dolor sit amet",
            },
            {
                id: 2,
                "fecha": "2022-03-18",
                "asunto": "En el asunto de martin gonzales leal",
                "salaOSeccion": "Sala de Amnistía",
                "nombreDecision": "Sentencia SRT-ST-120-2024",
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
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
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
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 5,
                "fecha": "2021-03-15",
                "asunto": "En el asunto de juan camilo molano pedraza",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 6,
                "fecha": "2022-03-08",
                "asunto": "En el asunto de camila moreno daza",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 7,
                "fecha": "2024-02-01",
                "asunto": "En el asunto de guillermo fernandez moreno",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 8,
                "fecha": "2021-02-14",
                "asunto": "En el asunto de valentina lozano paz",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 9,
                "fecha": "2021-02-14",
                "asunto": "En el asunto de alejandra arias vasquez",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 10,
                "fecha": "2021-02-14",
                "asunto": "En el asunto de camilo puentes alvarado",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 11,
                "fecha": "2021-08-22",
                "asunto": "En el asunto de mario ramirez duarte",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 12,
                "fecha": "2021-05-11",
                "asunto": "En el asunto de viviana suarez mondragon",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 13,
                "fecha": "2020-02-14",
                "asunto": "En el asunto de diego gomez valencia",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 14,
                "fecha": "2020-02-01",
                "asunto": "En el asunto de pablo bohórquez garzón",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 15,
                "fecha": "2019-02-14",
                "asunto": "En el asunto de luis benavides romero",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 16,
                "fecha": "2016-02-14",
                "asunto": "En el asunto de andrea castillo diaz",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 17,
                "fecha": "2021-02-09",
                "asunto": "En el asunto de esteban vargas jaramillo",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 18,
                "fecha": "2021-08-07",
                "asunto": "En el asunto de ricardo castro salazar",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 19,
                "fecha": "2019-02-14",
                "asunto": "En el asunto de sergio ramirez torres",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 20,
                "fecha": "2018-02-14",
                "asunto": "En el asunto de catalina moreno vargas",
                "salaOSeccion": "Sección de Revisión",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 21,
                "fecha": "2016-06-14",
                "asunto": "En el asunto de alejandro torres castro",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
            {
                id: 22,
                "fecha": "2017-01-15",
                "asunto": "En el asunto de isabel castillo vargas",
                "salaOSeccion": "Sección de Apelacion",
                "nombreDecision": "Sentencia SRT-ST-104-2024",
                "grupoPertence": "Grupo armado no firmante",
                "lugarHechos": "Acacías, Meta",
                "magistrado": "Augusto Rodriguez",
                "macrocaso": "08 ",
                "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."
        
            },
        ]
    );
    const [datosOriginales, setDatosOriginales] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedDoc, setSelectedDoc] = useState("");
    const [searchDocsOptions, setSearchDocsOptions] = useState([]);

    const getDocsTerm = () => {
        console.log('aaaaaa')
        tesauroService
            .getDocsByTerm(selectedTerm)
            .then(response => {
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const cardsArr = response.data.map(item => {
                        return {
                            id: item._source.id,
                            fecha: item._source.fecha_documento,
                            asunto: item._source.asunto,
                            salaOSeccion: item._source.despacho,
                            nombreDecision: "Sentencia SRT-ST-117-2024",
                            grupoPertence: "Grupo armado no firmante",
                            lugarHechos: "Acacías, Meta",
                            magistrado: "Augusto Rodriguez",
                            macrocaso: "08 ",
                            conclusionDecision: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                            extractoBusqueda: "extracto busqueda"
                        }
                    });
                    setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`)
                    setDatos(cardsArr);
                    setDatosOriginales(cardsArr);
                    const newOpcionesDocs = getOpcionesDocs(cardsArr);
                    setSearchDocsOptions(newOpcionesDocs);
                } else {
                setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`)
                }
            }
            )
            .catch(error => console.log(error));
    }

    // Genera el listado de opciones de documentos para el autocompletar
    const getOpcionesDocs = (arrDatos) => {
        const arrLinted = Array.from(
            new Map(arrDatos.map(item => [item.asunto, item])).values()
        );
        return [ { "title": "*" } ].concat(arrLinted.map( item => { return { "title": item.asunto } }));
    };

    const handlerSetSelectedDoc = (newSelectedOption) => {
        if(newSelectedOption !== "*"){
            const newArrDatos = datos.filter(item => item.asunto === newSelectedOption);
            setSelectedDoc(newSelectedOption);
            setDatos(newArrDatos);
        } else {
            setSelectedDoc("");
            setDatos(datosOriginales);
        }
    }

    const { verTodasDecisiones, busqueda } = useContext(Context);

    if (!selectedFilters) {
        selectedFilters = [];
    }
    const [isButtonSorterEnabled, setIsButtonSorterEnabled] = useState(false);

    // Estado del Boton ordenar 
    const toggleButton = () => {
        setIsButtonSorterEnabled(prev => !prev);
    };

    const [showFilter, setShowFilter] = useState(false);

    const handleFilter = () => {
      setShowFilter(!showFilter);
    };

    const [externalFilters, setExternalFilters] = useState([]);

    const [currentData, setCurrentData] = useState([]);

    // Función para ordenar en orden ascendente por fecha
    const sortAscByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
    };

    // Función para ordenar en orden descendente por fecha
    const sortDescByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
    };


    // Paginado
    const [page, setPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = React.useState(5);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const totalPages = Math.ceil(datos.length / itemsPerPage);
    let endIndexPage = Math.ceil(page * itemsPerPage);
    endIndexPage = endIndexPage > datos.length ? datos.length : endIndexPage

    const startIndexPage = Math.ceil(page * itemsPerPage + 1 - itemsPerPage);

    useEffect(() => {
        if(datos.length === 0){
            getDocsTerm();
        } else {
            getCurrentData();
        }
    }, [page, itemsPerPage, datos]);

    const getCurrentData = (items = 0) => {
        if (items === 0) {
            items = itemsPerPage;
        }
    
        const startIndex = (page - 1) * items;
        setCurrentData(datos.slice(startIndex, startIndex + items));
     
    }

    const handleChange2 = (event) => {
        setitemsPerPage(event.target.value);
        setPage(1);
    }


    // Grids personalizadas


    const SpaceGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            width: "100%",
            margin: '20px 0px 0px 0px',
        },
    }));

    const WrapGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            width: "100%",
            margin: '20px 0px 0px 0px',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0px 0px',
            display: isListSmall?'flex': '',
            flexWrap: isListSmall?'wrap': '',
        },
    }));

    const SpaceBetweenGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            width: "100%",
            textAlign: 'center',
            margin: '20px 0px 0px 0px',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0px 0px',
            display: 'flex',
            flexWrap: isListSmall ? 'wrap' : '',
            width: isListSmall ? "100%" : '',

        },
    }));


    const Width100Grid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {

            width: isListSmall?'100%': '',

        }
    }));

    const NoneGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            display: isListSmall ? 'none' : '',
        }
    }));

    const  JustMapGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            display: isListSmall ? 'flex' : 'none',
           
        }
    }));

    const  JustMapNoneGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.up('xs')]: {
            display: isListSmall ? 'none' : '',
        }
    }));

     if(datos.length === 0) {
        return (<LinearWithValueLabel></LinearWithValueLabel>)
     } else {
        return (
            <Stack>
                <div className=  {isListSmall ? ('text_results_search', 'no-spacing') :  ('text_results_search','margin_search') } >
                    <SpaceGrid>
                        <JustMapNoneGrid>
    
                        {!isExternalFilters && (
                            <h3 className="">Resultados de búsqueda</h3>
                        )}
                        {!busqueda && !verTodasDecisiones && (
                            <h4 className="text_diabled">Cuando ingrese una búsqueda verá los resultados aquí</h4>
                        )}
    
    
                        {!isExternalFilters && !selectedTerm && verTodasDecisiones && (
                            <h4 >Está buscando por <span className="text_bolder">"Todas las decisiones"</span> </h4>
                        )}
    
                        {selectedTerm && (
                            <h4 >Está buscando por <span className="text_bolder">{selectedTerm}</span> </h4>
            
                        )}
    
    
                        {busqueda && (
                            <h4 >Está buscando por <span className="text_bolder">{busqueda}</span> </h4>
                        )}
    
                        {!selectedTerm && !isExternalFilters && selectedFilters.length === 0 && (
                            <h4 className="text_diabled">(Aún no ha agregado ningún filtro a su búsqueda)</h4>
                        )}
                        {selectedFilters.length > 0 && (
                            <Box sx={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selectedFilters.map((value) => (
                                    <Chip
                                        onMouseDown={e => {
                                            e.stopPropagation()
                                        }}
                                        className="chip_select" key={value} label={value}
                                    />
    
    
                                ))}
                            </Box>
                        )}
                        {externalFilters.length > 0 && (
                            <div>
                                <h5 className="text_bolder margin_bottom_s margin_top_s">Su búsqueda se está filtrando por:</h5>
                                <Box className=" margin_bottom_m display_flex flex_wrap" sx={{  gap: 0.5 }}>
                                {externalFilters.map((value) => (
                                    <Chip
                                        onMouseDown={e => {
                                            e.stopPropagation()
                                        }}
                                        className="chip_select" key={value} label={value}
                                    />
    
    
                                ))}
                                </Box>
                            
                            </div>    
                        )}
                        </JustMapNoneGrid>
                    </SpaceGrid>
    
                    {(verTodasDecisiones || busqueda) && (
                        <div >
    
                            <Grid container spacing={2}>
    
    
                                <SpaceBetweenGrid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <Grid item xs={12} sm={12} md= {(isListSmall ? 12 : 6)} lg={(isListSmall ? 12 : 6)} xl={(isListSmall ? 12 : 6)}>
                                        <JustMapGrid > 
                                            <h4 className="text_bolder"> Decisiones </h4> 
                                        </JustMapGrid>
                                            {isExternalFilters && (
                                                <div className='filter_sort_container'>
                                                    <FilterShort setSelectedFilters={setExternalFilters}/>
                                                    <NoneGrid className='margin_left_s'>
                                                        <Button className="button_function" startIcon={<SortIcon />} onClick={toggleButton}>Ordenar
                                                        </Button>
                                                        {isButtonSorterEnabled && (
                                                            <div className='container_date_sorted'>
                                                                <Button onClick={sortAscByDate} className='items_sorted'>fecha ascendente </Button>
                                                                <Button onClick={sortDescByDate} className='items_sorted'>fecha descendente </Button>
                                                            </div>
                                                        )}
                                                    </NoneGrid>
                                                </div>
                                            )}
    
                                            {!isExternalFilters && (
                                                <NoneGrid>
                                                  <Button className="button_function" startIcon={<SortIcon />} onClick={toggleButton}>Ordenar
                                                  </Button>
                                                  {isButtonSorterEnabled && (
                                                      <div className='container_date_sorted'>
                                                          <Button onClick={sortAscByDate} className='items_sorted'>fecha ascendente </Button>
                                                          <Button onClick={sortDescByDate} className='items_sorted'>fecha descendente </Button>
                                                      </div>
                                                  )}
                                                </NoneGrid>  
                                            )}
                                    </Grid>
    
                                    <Grid item  className="justify_end_partial" xs={12} sm={12} md= {(isListSmall ? 12 : 6)} lg={(isListSmall ? 12 : 6)} xl={(isListSmall ? 12 : 6) }>
                                        
                                        <SearchBarSmall searchOptions={searchDocsOptions} handlerSetSelectedOption={handlerSetSelectedDoc}> </SearchBarSmall>
    
                                    </Grid>
                                </SpaceBetweenGrid>
    
                            </Grid>
                        </div>
                    )}
                </div>
    
                {(verTodasDecisiones || busqueda) && (
                    <>
                        <WrapGrid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex " >
                            <Width100Grid>
                                <p className="margin_results_page">
                                    
                                    <span> {startIndexPage} </span> a
                                    <span> {endIndexPage} </span> de
                                    <span className="text_bolder"> {datos.length} </span> decisiones
                                </p>
                            </Width100Grid>
                            <NoneGrid>
                                <p className='margin_xs'> | </p>
                            </NoneGrid>
    
                            <div >
                                <Width100Grid className='width_100 flex '>
                                <p className="margin_results_page">Resultados por página  </p>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                                            <Select className= {isListSmall ? "select_items_results_small" : ("select_items_results justify_center")} 
                                                value={itemsPerPage}
                                                onChange={handleChange2}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            boxShadow: '0px 8px 24px rgba(57, 129, 195, 0.2) ', // Sombra 
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={datos.length}>Todas</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    
                                </Width100Grid>
                            </div>
    
                        </WrapGrid>
    
                        <div className="separator width_100"></div>
    
                        <SpaceGrid className="justify_end">
    
                            <Pagination className="margin_top_s"
                                count={totalPages}
                                page={page}
                                onChange={handleChange}
                                renderItem={(item, id) => (
                                    <PaginationItem key={id}
                                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                        {...item}
                                    />
                                )}
                            />
                        </SpaceGrid>
    
                        <List className="width_100">
                            {currentData.map((item, k) => (
                                <SpaceGrid key={k}>
                                    <ListItem className="padding_none" key={item.id}>
                                        <CardSearch className="padding_none" datos={item}></CardSearch>
                                    </ListItem>
                                </SpaceGrid>
                            ))}
    
                        </List>
    
                        <SpaceGrid className="justify_end">
                            <Pagination className="pagination_container margin_bottom_s"
                                count={totalPages}
                                page={page}
                                onChange={handleChange}
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                        {...item}
                                    />
                                )}
                            />
    
                        </SpaceGrid>
                    </>
                )
    
                }
    
            </Stack>
    
        );
     } 
}