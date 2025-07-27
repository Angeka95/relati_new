import React, { useState, useEffect, useContext, useRef } from 'react';
import { Stack, List, ListItem, Button, Box, Chip, Alert } from '@mui/material';
import CardSearch from './../cardSearchResults.js';
import SearchBarForInnerResults from './../searchBarForInnerResults.js';
import { SpaceGrid, SpaceBetweenGrid, NoneGrid, JustMapGrid, JustMapNoneGrid } from './../listCardSearch/gridComponents.js';
import SortIcon from '@mui/icons-material/Sort';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Grid } from '@mui/material';
import Context from './../../context/context.js';
import FilterShort from './../filterShort.js';
import { filtroByDefault, validarfiltroJurisprudencial, getOpcionesAutocompletar, getDecisionesIDsToExport, validateSearchParamsBusquedaAV, formattingSearchParamsBusquedaAV  } from './../../helpers/utils.js';
import LinearWithValueLabel from './../../components/linearProgress.js';  
import ButtonDownloadZIPCustom from './../buttonDownloadZIPCustom.js';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ButtonDownloadDecisiones from './../buttonDownloadDecisiones.js';
import PaginatorContext from './../../context/paginatorContext.js';
import Paginator from './../paginatorComponent/Paginator.js';
import PaginatorDetails from './../paginatorComponent/PaginatorDetails.js';
import './../../App.css';

export default function Card({ datosBusqueda, searchOptions, selectedFilters, isListSmall, selectedTerm, isLargeResult, isExternalFilters, objPagination = {}, paramsBusquedaAV = null }) {  
    const [datos, setDatos] = useState(datosBusqueda);
    const [datosOriginales, setDatosOriginales] = useState(datosBusqueda);
    const [selectedDoc, setSelectedDoc] = useState({ "title": "* Todos los resultados", "id": 0 });
    const [searchDocsOptions, setSearchDocsOptions] = useState(searchOptions);
    const [datosToExport, setDatosToExport] = useState("");
    const [valorBuscadorEnResultados, setValorBuscadorEnResultados] = useState("");
    const [message, setMessage] = useState({ message: "", classname: "" });

    const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
    
    useEffect(() => {
        if(!validarfiltroJurisprudencial(filtroJurisprudencial)) { 
            let newMessage = { message: "", classname: "" }; 
            let datosFiltrados = [...datos];
            setPage(1);
            setMessage({ message: "", classname: "" });
           
            if(filtroJurisprudencial.departamentos.length > 0){
                datosFiltrados = datosFiltrados.filter( item => { 
                    return filtroJurisprudencial.departamentos.some(elemento => item.departamentoNombre.toLowerCase().includes(elemento.toLowerCase())); 
                });
            }
            if(filtroJurisprudencial.anios.length > 0){
                datosFiltrados = datosFiltrados.filter( item => { 
                    return filtroJurisprudencial.anios.some(elemento => String(item.anio).includes(elemento)); 
                });
            }
            if(filtroJurisprudencial.salas.length > 0){
                datosFiltrados = datosFiltrados.filter( item => { 
                    return filtroJurisprudencial.salas.includes(item.sala) 
                });
            }
            if(filtroJurisprudencial.macrocasos.length > 0){
                datosFiltrados = datosFiltrados.filter( item => { 
                    return filtroJurisprudencial.macrocasos.some(elemento => item.caso.toLowerCase().includes(elemento.toLowerCase())); 
                });
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
                        return filtroJurisprudencial.delitos.some(delito => { 
                            return item.delitos.toLowerCase().includes(delito.toLowerCase());
                        });
                    }
                    return false;
                });
            } 
            if(filtroJurisprudencial.procedimientos.length > 0){
                datosFiltrados = datosFiltrados.filter( item =>  {
                    if(item.procedimientos.length > 0 ){
                        return filtroJurisprudencial.procedimientos.some(procedimiento => {
                                return item.procedimientos.toLowerCase().includes(procedimiento.toLowerCase());
                            }
                        );
                    }
                    return false;
                });
            } 
            //console.log("Datos filtrados", datosFiltrados)
            if(datosFiltrados.length > 0) {
                newMessage["message"] = `Hay resultados.`;
                newMessage["classname"] = 'success';
            } else {
                newMessage["message"] = `No se encontraron resultados.`;
                newMessage["classname"] = 'warning';
            }
            setMessage(newMessage);
            setDatos(datosFiltrados);
            setSearchDocsOptions(getOpcionesAutocompletar(datosFiltrados));
        } else {
            setDatos(datosOriginales);
            setSearchDocsOptions(searchOptions);
        }
    }, [filtroJurisprudencial]);

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
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };

    // Función para ordenar en orden descendente por fecha
    const sortDescByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };
    
    // Función para ordenar en orden ascendente por score
    const sortAscByScore = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(a.score) - new Date(b.score));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };

    // Función para ordenar en orden descendente por score
    const sortDescByScore = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(b.score) - new Date(a.score));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };
    
    
    // Funciones de paginacion
    
    const { page, itemsPerPage, setCustomPagination, setPage } = useContext(PaginatorContext);
    
    useEffect(() => {
        setCustomPagination(objPagination);
    }, []);
       
    // custom Pagination

    const getCurrentData = (items = 0) => {
        if (items === 0) {
            items = itemsPerPage;
        }
        const startIndex = (page - 1) * items;
        setCurrentData(datos.slice(startIndex, startIndex + items));
    }

    // Fin funciones de paginacion

    // Manipula el valor de busqueda que viene desde SearchBarForInnerResults y en valor
    
    const searchBarForInnerResultsInputRef = useRef(null);
            
    const handlerInnerSearch = (valueSearchBarInner) => {
        //console.log("filtro jurs", filtroJurisprudencial);
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
    
    // Este useEffect permite obtener el listado de IDs a partir de los datos resultantes y preparalos para ser exportados en un archivo de Excel
    useEffect(() => {
        if (datos.length > 0) {
            getCurrentData();
            setDatosToExport(getDecisionesIDsToExport(datos, "providencia_id"));
        }
    }, [page, itemsPerPage, datos]);
        
     if(datosBusqueda.length > 0) {
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
    
                        {(!isExternalFilters && !selectedTerm && verTodasDecisiones && paramsBusquedaAV === null ) && 
                            <h4 >Está buscando por <span className="text_bolder">"Todas las decisiones"</span> </h4>
                        }

                        {(validateSearchParamsBusquedaAV(paramsBusquedaAV) === true) &&
                            <h4 >Búsqueda avanzada por <span className="text_bolder">"{formattingSearchParamsBusquedaAV(paramsBusquedaAV)}"</span></h4>
                        }
    
                        {selectedTerm && (
                            <h4 >Está buscando por <span className="text_bolder">"{selectedTerm}"</span> </h4>
            
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
                    <div>
                        <Grid container spacing={2}>
                            <SpaceBetweenGrid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <Grid item xs={12} sm={12} md= {(isListSmall ? 12 : 8)} lg={(isListSmall ? 12 : 8)} xl={(isListSmall ? 12 : 8)}>
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
                                                          <Button onClick={sortDescByDate} className='items_sorted' endIcon={<ArrowUpwardIcon />} >Más recientess </Button>
                                                          <Button onClick={sortAscByDate} className='items_sorted' endIcon={<ArrowDownwardIcon />} >Más antiguos </Button>
                                                          <Button onClick={sortDescByScore} className='items_sorted' endIcon={<ArrowUpwardIcon />} >Mayor Relevancia </Button>
                                                          <Button onClick={sortAscByScore} className='items_sorted' endIcon={<ArrowDownwardIcon />} >Menor Relevancia </Button>
                                                        </div>
                                                    )}
                                                </NoneGrid>
                                            </div>
                                        )}

                                        {!isExternalFilters && (
                                            <NoneGrid className="display_flex">
                                                <div className=" position_relative"> 
                                              <Button className="button_function" startIcon={<SortIcon />} onClick={toggleButton}>Ordenar
                                              </Button>
                                          
                                                
                                              {isButtonSorterEnabled && (
                                                  <div className='container_date_sorted'>
                                                      <Button onClick={sortDescByDate} className='items_sorted' endIcon={<ArrowUpwardIcon />} >Más recientes </Button>
                                                      <Button onClick={sortAscByDate} className='items_sorted' endIcon={<ArrowDownwardIcon />} >Más antiguos </Button>
                                                      <Button onClick={sortDescByScore} className='items_sorted' endIcon={<ArrowUpwardIcon />} >Mayor Relevancia </Button>
                                                      <Button onClick={sortAscByScore} className='items_sorted' endIcon={<ArrowDownwardIcon />} >Menor Relevancia </Button>
                                                  </div>
                                              )}</div>
                                            {<ButtonDownloadDecisiones
                                                isButtonDownloadEnabled={false}
                                                datos={datos}
                                                datosToExport={datosToExport}
                                                sortAscByDate={sortAscByDate}
                                            />}
                                            </NoneGrid>  
                                        )}
                                </Grid>

                                <Grid item  className="justify_end_partial" xs={12} sm={12} md={(isListSmall ? 12 : 4)} lg={(isListSmall ? 12 : 4)} xl={(isListSmall ? 12 : 4) }>
                                    {/*<SearchBarSmall searchOptions={searchDocsOptions} handlerSetSelectedOption={handlerSetSelectedDoc}> </SearchBarSmall>*/}
                                     {/* Ocultar temporalmente */}
                                     {/* <SearchBarForInnerResults handlerInnerSearch={handlerInnerSearch} handlerReset={deshacerBusqueda} ref={searchBarForInnerResultsInputRef}></SearchBarForInnerResults> */}
                                </Grid>
                            </SpaceBetweenGrid>
                        </Grid>
                    </div>
                </div>
                <>  
                    <PaginatorDetails datosLength={datos.length} isListSmall={isListSmall} selectedTerm={selectedTerm}/>
                    {/* <div className="justify_end">    
                        { ((datos.length > 0) && (datosToExport !== null)) && 
                            <>
                               
                                <ButtonDownloadXLSCustom
                                    stringURL={`${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadresult`}
                                    stringParams={`idpro=${datosToExport}`}
                                    datosToExport={datosToExport}
                                    filename="resultados.xlsx"
                                />    
                            </>
                        }
                    </div> */}
                    <div className="separator width_100"></div>
                    {/* Lista de resultados */}
                    {(datos.length > 0) ?
                        <>
                            <Paginator 
                                        datosLength={datos.length} 
                                        selectedTerm={selectedTerm}
                                        href={`/resultados-busqueda`}
                            />   
                            <List className="width_100">
                                {currentData.map((item, k) => (
                                    <SpaceGrid key={k}>
                                        <ListItem className="padding_none" key={item.id}>
                                            <CardSearch className="padding_none" datos={item}></CardSearch>
                                        </ListItem>
                                    </SpaceGrid>
                                ))}
                            </List>
                            <Paginator 
                                        datosLength={datos.length} 
                                        selectedTerm={selectedTerm}
                                        href={`/resultados-busqueda`}
                            />  
                        </>
                        :
                        <>
                            {(message.message === "") ?
                                <>
                                    <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuesta..."]}></LinearWithValueLabel>
                                </>
                                :
                                <>
                                    {((message.classname === "error") || (message.classname === "warning")) &&
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
            </Stack>
        );
     }
}