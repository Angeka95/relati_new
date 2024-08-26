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

let datos = [
    {
        id: 1,
        "fecha": "2023-06-15",
        "asunto": "En el asunto de héctor orlando bastidas bravo",
        "nombreDecision": "Sentencia SRT-ST-117-2024",
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
        "nombreDecision": "Sentencia SRT-ST-104-2024",
        "grupoPertence": "Grupo armado no firmante",
        "lugarHechos": "Acacías, Meta",
        "magistrado": "Augusto Rodriguez",
        "macrocaso": "08 ",
        "conclusionDecision": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
        "extractoBusqueda": "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam ite minimum secuestro. Est audiam animal molestiae te. Ex duo eripuit mentitum. As min..."

    },
]



export default function Card({selectedFilters}) {
    const {verTodasDecisiones, busqueda} = useContext(Context);

    if(!selectedFilters) {
        selectedFilters = [];
    }
    const [isButtonSorterEnabled, setIsButtonSorterEnabled] = useState(false);

    // Función para alternar el estado del botón
    const toggleButton = () => {
        setIsButtonSorterEnabled(prev => !prev);
    };



    const [currentData, setCurrentData] = useState([]);

    // Función para ordenar en orden ascendente por fecha
    const sortAscByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        datos = sortedDatos;
        getCurrentData();
        setIsButtonSorterEnabled(false);
    };

    // Función para ordenar en orden descendente por fecha
    const sortDescByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        datos = sortedDatos;
        getCurrentData();
        setIsButtonSorterEnabled(false);
    };

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
        getCurrentData();
    }, []);

    useEffect(() => {
        getCurrentData();
    }, [page, itemsPerPage]);

    const getCurrentData = (items = 0) => {
        if (items == 0) {
            items = itemsPerPage;
        }
        // Obtener los datos para la página actual
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
            textAlign: 'center',
            margin: '20px 0px 0px 0px',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0px 0px',
            
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
            justifyContent: 'space-between'
            
        },
    }));


    const Width100Grid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }));

    const NoneGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            display: 'none',}
    }));

    const SpaceTop = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.down('sm')]: {
            marginTop: '40px',
        }
    }));

    return (
        <Stack>
            <div className="text_results_search margin_search">
                <SpaceGrid>
                <h3 className="">Resultados de búsqueda</h3>
                {!busqueda && !verTodasDecisiones && (
                    <h4 className="text_diabled">Cuando ingrese una búsqueda verá los resultados aquí</h4>
                )}

                
                {verTodasDecisiones &&(
                    <h4 >Está buscando por <span className="text_bolder">"Todas las decisiones"</span> </h4>
                )}
                

                {busqueda && (
                    <h4 >Está buscando por <span className="text_bolder">"{busqueda}"</span> </h4>
                )}
                
                {selectedFilters.length === 0 && (
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
                </SpaceGrid>

                {(verTodasDecisiones || busqueda) && (
                    <div >

                        <Grid container spacing={2}>
                            
                                
                                <SpaceBetweenGrid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}> 
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
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    
                                            <SearchBarSmall ></SearchBarSmall>
                                    
                                    </Grid>
                                </SpaceBetweenGrid>
                                
                        </Grid>
                    </div>
                )}
            </div>

            {(verTodasDecisiones || busqueda) && (
                <>
                                    <SpaceGrid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex"> 
                        <Width100Grid>
                            <p>
                            <span className="text_bolder">  </span> Resultados de 
                            <span> {startIndexPage} </span> a
                            <span> {endIndexPage} </span> de 
                            <span className="text_bolder"> {datos.length} </span> en total
                            </p>
                        </Width100Grid>
                        <NoneGrid> 
                        <p className='margin_xs'> | </p>
                        </NoneGrid>

                        
                        <div > 
                        <Width100Grid className='width_100 flex'>

                            <p className="">Mostrando </p>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                                    <Select className="select_items_results justify_center"
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
                            <p className=""> resultados por página  </p>
                        </Width100Grid>
                        </div>
                     
                    </SpaceGrid> 
                    
            


                 <SpaceGrid className="justify_end">

                    <Pagination className="margin_top_s"
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
              
                
                
                
                <List className="width_100">
                
                    {currentData.map(item => (
                        <SpaceGrid>
                        <ListItem  className="padding_none" key={item.id}>
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