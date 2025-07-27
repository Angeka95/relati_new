import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Context from './../context/context.js';
import PaginatorProvider from '../context/paginatorProvider.js';
import { Container, Grid, Alert, Button, Box } from '@mui/material';
import Filter from '../components/filter.js';
import FilterBeta from '../components/filterBeta.js';
import ListCardSearch from '../components/resultadosBusqueda/listCardSearchResults.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import SearchBar from '../components/searchBar.js'
import buscadorService from '../services/buscador.js';
import busquedaAvanzadaService from '../services/busqueda_avanzada.js';
import { filtroByDefault, validarfiltroJurisprudencial, getOpcionesAutocompletar, validateSearchParamsBusquedaAV, formattingSearchParamsBusquedaAV } from '../helpers/utils.js';
import dataResults from '../data_results/dataResBusqueda.js';
import dataFilterResults from '../data_results/dataFilterResBusqueda.js';
import '../App.css';

export default function SearchResults() {

  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const stringParam = decodeURIComponent(searchParams.get('string'));

  const [datos, setDatos] = useState([]);
  const [customFilter, setCustomFilter] = useState([]);
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("");
  const [stringQueryLs, setStringQueryLs] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [paramsBusquedaAV, setParamsBusquedaAV] = useState({});
   const [pagination, setPagination] = useState({});

  // Variables de Contexto
  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);
  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  
  const stringParamPage = (searchParams.get('page')) ? decodeURIComponent(searchParams.get('page')) : 1;
  const stringParamPerPage = (searchParams.get('per_page')) ? decodeURIComponent(searchParams.get('per_page')) : 10;
  
  // Esta funcion permite configurar el mensaje de error o exito en variable message
  const handleMessage = (newMessage) => {
    setTimeout(function(){ 
        setMessage(newMessage);
    }, 3000);
  };
  
  const getResultadosBuscadorAI = (searchParamsObj) => {
    let newMessage = {}; 
    buscadorService
      .getSearchQDataV2(searchParamsObj)
      .then(response => {
          if((response.status_info.status === 200) && (response.data.length > 0)) {
              let objPagination = Object.assign({}, response.pagination[0]);
              objPagination["per_page"] = Number(objPagination["per_page"]);
              setPagination(objPagination);
              const newDatos = dataResults(response.data);
              const newDatosFilters = dataFilterResults(response.filters);
              setDatos(newDatos);
              setCustomFilter(newDatosFilters);
              setSearchOptions(getOpcionesAutocompletar(newDatos));
              newMessage["message"] = `${response.status_info.reason}`;
              newMessage["classname"] = 'success';
          } else if(response.status_info.status === 500) {
              newMessage["message"] = `${response.status_info.reason}`;
              newMessage["classname"] = 'error';
          } else {
            newMessage["message"] = `${response.status_info.reason}`;
            newMessage["classname"] = 'warning';
          }
          handleMessage(newMessage);
      }
    )
    .catch(error => { 
        newMessage["message"] = `${error}`;
        newMessage["classname"] = 'error';
        handleMessage(newMessage);
    });
  };

  // Esta funcion obtiene los resultados de busqueda por buscador avanzando
  const getResultadosBuscadorAV = (searchParamsObj) => {
      let newMessage = {}; 
      busquedaAvanzadaService
        .getAllResultsBusquedaAV(searchParamsObj)
        .then(response => {
              if((response.status_info.status === 200) && (response.data.length > 0)) {
                const newDatos = dataResults(response.data);
                const newDatosFilters = dataFilterResults(response.filters);
                setDatos(newDatos);
                setCustomFilter(newDatosFilters);
                setSearchOptions(getOpcionesAutocompletar(newDatos));
                newMessage["message"] = `${response.status_info.reason}`;
                newMessage["classname"] = 'success';
              } else if(response.status_info.status === 500) {
                newMessage["message"] = `${response.status_info.reason}`;
                newMessage["classname"] = 'error';
              } else {
                newMessage["message"] = `${response.status_info.reason}`;
                newMessage["classname"] = 'warning';
              }
              handleMessage(newMessage); 
          }
        )
        .catch(error => { 
          newMessage["message"] = `${error}`;
          newMessage["classname"] = 'error';
          handleMessage(newMessage);
        });
  }

  /* useEffects */

  // NO BORRAR: Si no hay datos en la consulta, se establece el filtro jurisprudencial por defecto
  useEffect(() => {
    if(datos.length === 0){
        setFiltroJurisprudencial(filtroByDefault);
    } 
  }, []);

  // NO BORRAR: Este useEffect cambia el estado de contexto estadoVerTodasDecisiones a false
  useEffect(()=>{
    setEstadoVerTodasDecisiones(false);
  },[]);
  
  // NO BORRAR: Si la seccion /resultados-busqueda no cuenta con ningun parametro, lo envia al home
  useEffect(() => {
    const url = window.location.href;  
    const tieneParametros = url.includes('?');
    if (!tieneParametros) {
      navigate("/");
    } 
  },[]);
  
  // Este useEffect para obtener los resultados
  useEffect(()=>{
    const searchParamsObj = Object.fromEntries(searchParams.entries());
    if(validateSearchParamsBusquedaAV(searchParamsObj)){ 
            // Busqueda avanzada
            // console.log("entra al avanzada");
            setParamsBusquedaAV(searchParamsObj);
            getResultadosBuscadorAV(searchParamsObj);
    } else if ((stringParam === "") || (stringParam === null) || (stringParam === "null")) {
          let newMessage = {};
          newMessage["message"] = `No se puede realizar la solicitud.`;
          newMessage["classname"] = 'error';
          handleMessage(newMessage);
          setDatos([]);
          navigate('/');
    } else {
      if(stringQuery === ""){
        setStringQuery(stringParam);
      } else { 
        // Busqueda normal
        if(datos.length === 0){
          getResultadosBuscadorAI(searchParamsObj);
        }
      } 
    } 
  },[stringQuery, stringParam]);
  
  // Si el filtroJurisprudencial como variable de contexto es un objeto vacio, tambien se limpia el estado de selectedFilters
  useEffect(() => {
    if(validarfiltroJurisprudencial(filtroJurisprudencial)){ 
        setSelectedFilters([]);
    } 
  }, [filtroJurisprudencial]);
  
  // Esta funcionalidad permite deshacer la busqueda
  const deshacerBusqueda = (e) => {
    setFiltroJurisprudencial(filtroByDefault);
  };

  return (
    <>
      {(datos.length === 0) ?
        <Container className="margin_bottom_m">
          <h1 className="text_center margin_top_l">Resultados de Búsqueda</h1>  
          <p className="text_center"></p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <>
              {(validateSearchParamsBusquedaAV(paramsBusquedaAV) === true) ? 
                <p>Búsqueda avanzada por <strong>"{formattingSearchParamsBusquedaAV(paramsBusquedaAV)}"</strong></p>
              :
                <p>Buscando por: <strong>"{stringQuery}"</strong></p>
              }
              {(message.message === "") ?
                <>
                <LinearWithValueLabel processingMessages={["Procesando solicitud...", "Preparando respuesta..."]}></LinearWithValueLabel> 
                </> 
                :
                <>
                <Alert variant="outlined" severity={message.classname}>
                  {message.message}
                </Alert>
                { ((message.classname === "error") || (message.classname === "warning")) && 
                  <Box sx={{ px: 0, my: 2, display: 'flex', justifyContent: 'center' }}>
                  {( searchParams.get('advanced_search') === "true") ? 
                  <a href="/busqueda-avanzada" target='_self' rel="noreferrer">
                      <Button className="button_primary margin_xs card_size_small">Realiza una nueva búsqueda</Button>
                  </a> 
                  :
                  <a href="/" target='_self' rel="noreferrer">
                      <Button className="button_primary margin_xs card_size_small">Realiza una nueva búsqueda</Button>
                  </a>
                  }
                  </Box>
                }
                </>
              } 
              </>
            </Grid>
          </Grid>
        </Container>      
        :  
        <Container className="margin_bottom_m">
          <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
              <p></p>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
              <SearchBar isSearchAdvance={true}/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              {(customFilter !== null) ? 
                <FilterBeta setSelectedFilters={setSelectedFilters} customFilter={customFilter} isFilterFloat={false} isShowingFilter={false} isSearchAdvance={false} handlerReset={deshacerBusqueda}></FilterBeta>
              :
                <Filter setSelectedFilters={setSelectedFilters} handlerReset={deshacerBusqueda}></Filter>
              } 
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <PaginatorProvider>
                  <ListCardSearch datosBusqueda={datos} selectedTerm={stringQuery} searchOptions={searchOptions} selectedFilters={selectedFilters} isExternalFilters={false} paramsBusquedaAV={paramsBusquedaAV} objPagination={pagination}></ListCardSearch>
                </PaginatorProvider>
            </Grid>
          </Grid>
        </Container>
      }
    </>  
  );
}
