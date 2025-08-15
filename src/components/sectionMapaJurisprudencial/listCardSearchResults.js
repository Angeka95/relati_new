import React, { useState, useEffect, useContext, useRef } from 'react';
import { Stack, Pagination, PaginationItem, List, ListItem, Button, Box, Chip, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardSearch from './cardSearchResults.js';
import SearchBarSmall from '../../components/searchBarSmall.js';
import SearchBarForInnerResults from './../searchBarForInnerResults.js';
import SortIcon from '@mui/icons-material/Sort';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EditCalendar } from '@mui/icons-material';
import Context from '../../context/context';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FilterShort from './../filterShort';
import FilterListIcon from '@mui/icons-material/FilterList';
import LinearWithValueLabel from '../../components/linearProgress.js';
import { validarfiltroJurisprudencial, filtroByDefault } from '../../helpers/utils.js';
import '../../App.css';

export default function Card({ datosMapa, datosOriginalesMapa, searchDocsOptionsMapa, selectedFilters, isListSmall, selectedTerm, isLargeResult, isExternalFilters }) {

    const { isDatosMapaJurisprudencial, dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial } = useContext(Context);

    const [datos, setDatos] = useState(datosMapa);
    const [datosOriginales, setDatosOriginales] = useState(datosOriginalesMapa);
    const [message, setMessage] = useState({ message: "", classname: "" });
    const [valorBuscadorEnResultados, setValorBuscadorEnResultados] = useState("");

    const { verTodasDecisiones, busqueda } = useContext(Context);
    
    const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);

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
        if(datos.length > 0) {
            setDatos(datosOriginales);
            if(dptoSelMapaJurisprudencial !== null) {
                setDatos(newDatos => [...datos].filter(item => (item.departamentoNombre === dptoSelMapaJurisprudencial.dpto)));
            } 
        } else {
            setDatos(datosOriginales);
        }
    }, [ dptoSelMapaJurisprudencial]);

    useEffect(() => {
        if(datos.length > 0) {
            getCurrentData(); 
        } 
    }, [page, itemsPerPage, datos]);

    useEffect(() => {
        if(!validarfiltroJurisprudencial(filtroJurisprudencial)) {
            let datosFiltrados = datos;
            setPage(1);
            if(filtroJurisprudencial.departamentos.length > 0){
                datosFiltrados = datosFiltrados.filter( item => {
                    return filtroJurisprudencial.departamentos.includes(item.departamentoNombre);
                });
            }
            if(filtroJurisprudencial.anios.length > 0){
                datosFiltrados = datosFiltrados.filter( item => filtroJurisprudencial.anios.includes(item.anio));
            }
            if(filtroJurisprudencial.salas.length > 0){
                datosFiltrados = datosFiltrados.filter( item => filtroJurisprudencial.salas.includes(item.sala));
            }
            if(filtroJurisprudencial.macrocasos.length > 0){
                datosFiltrados = datosFiltrados.filter( item => filtroJurisprudencial.macrocasos.includes(item.caso));
            }
            if(filtroJurisprudencial.comparecientes.length > 0){
                datosFiltrados = datosFiltrados.filter( item => {
                    if(item.comparecientes.length > 0 ){
                        return filtroJurisprudencial.comparecientes.some(compareciente => { 
                            return item.comparecientes.toLowerCase().includes(compareciente.toLowerCase());
                            
                        });
                    }
                    return false;
                });
            }
            if(filtroJurisprudencial.delitos.length > 0){
                datosFiltrados = datosFiltrados.filter( item =>  {
                    if(item.delitos.length > 0 ){
                        return filtroJurisprudencial.delitos.some(delito => item.delitos.toLowerCase().includes(delito.toLowerCase()));
                    }
                    return false;
                });
            } 
            if(filtroJurisprudencial.procedimientos.length > 0){
                datosFiltrados = datosFiltrados.filter( item =>  {
                    if(item.procedimientos.length > 0 ){
                        return filtroJurisprudencial.procedimientos.some(procedimiento => item.procedimientos.toLowerCase().includes(procedimiento.toLowerCase()));
                    }
                    return false;
                });
            } 
            setDatos(datosFiltrados);
        } else {
            setDatos(datosOriginales);
        }
    }, [filtroJurisprudencial]);

    const getCurrentData = (items = 0) => {

        if (items === 0) {
            items = itemsPerPage;
        }
    
        const startIndex = (page - 1) * items;

        setCurrentData(currentData => datos.slice(startIndex, startIndex + items));
    }

    const handleChange2 = (event) => {
        setitemsPerPage(event.target.value);
        setPage(1);
    }
    
    // Manipula el valor de busqueda que viene desde SearchBarForInnerResults y en valor
        
     const searchBarForInnerResultsInputRef = useRef(null);
            
     const handlerInnerSearch = (valueSearchBarInner) => {
         let newMessage = { message: "", classname: "" }; 
         let newArrDatos = [];
         setPage(1);
         setDatos([]);
         setMessage({ message: "", classname: "" });
         if(valueSearchBarInner !== ""){
             newArrDatos = [...datos].filter(item => {
                 return item.autocompletarBuscador.title.toLowerCase().includes(valueSearchBarInner.toLowerCase());
             });
             if(newArrDatos.length > 0) {
                 newMessage["message"] = `Hay resultados`;
                 newMessage["classname"] = 'success';
             } else {
                 newMessage["message"] = `No se encontraron resultados por ${valueSearchBarInner}`;
                 newMessage["classname"] = 'warning';
             }
             setValorBuscadorEnResultados(valueSearchBarInner);
         } else {
             newArrDatos = [...datosOriginales];
             newMessage["message"] = "";
             newMessage["classname"] = "";
         }
         setTimeout(() => { 
             setDatos(newArrDatos);
             setMessage(newMessage);
         }, 800); 
     };
         
     const deshacerBusqueda = (e) => {
         setPage(1);
         setDatos([]);
         setMessage({ message: "", classname: "" });
         searchBarForInnerResultsInputRef.current.clear(); 
         setTimeout(() => { 
             setDatos(datosOriginales);
             setFiltroJurisprudencial(filtroByDefault);
         }, 800); 
     }
     
     // Fin de manipula el valor de busqueda que viene desde SearchBarForInnerResults y en valor
    

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
    
    if(isDatosMapaJurisprudencial) {
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
        
        
                            {/*busqueda && (
                                <h4 >Está buscando por <span className="text_bolder">{busqueda}</span> </h4>
                            )*/}
        
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
                                <Box sx={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {externalFilters.map((value) => (
                                        <Chip
                                            onMouseDown={e => {
                                                e.stopPropagation()
                                            }}
                                            className="chip_select" key={value} label={value}
                                        />
        
        
                                    ))}
                                </Box>
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
        
                                        <Grid item  className="justify_end_partial" style={{display: "none"}} xs={12} sm={12} md= {(isListSmall ? 12 : 6)} lg={(isListSmall ? 12 : 6)} xl={(isListSmall ? 12 : 6) }>
                                            {/*<SearchBarSmall searchOptions={searchDocsOptions} handlerSetSelectedOption={handlerSetSelectedDoc}> </SearchBarSmall>*/}
                                            <SearchBarForInnerResults handlerInnerSearch={handlerInnerSearch} handlerReset={deshacerBusqueda} showLabel="false" ref={searchBarForInnerResultsInputRef}></SearchBarForInnerResults> 
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
                            {/* Lista de resultados */}
                            { (datos.length > 0) ?
                                <>            
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
                            :
                                <>
                                    { (message.message === "") ?
                                        <>
                                        <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuesta..."]}></LinearWithValueLabel> 
                                        </> 
                                        :
                                        <>
                                        { ((message.classname === "error") || (message.classname === "warning")) && 
                                          <>
                                          <Alert variant="outlined" severity={message.classname}>
                                          {message.message}
                                          </Alert>
                                          <Box sx={{ px: 0, my: 2, display: 'flex', justifyContent: 'center' }}>
                                            <Button className="button_primary margin_xs card_size_small" target='_self' rel="noreferrer" onClick={deshacerBusqueda}>Deshacer búsqueda</Button>
                                          </Box>
                                          </>
                                        }
                                        </>
                                    }
                                </>
                            }
                            {/* Lista de resultados */}
                        </>
                    )
        
                    }
        
                </Stack>
        );
    } 
}