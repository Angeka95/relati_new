import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Context from '../context/context.js';
import { useCleanLocalStorageVars } from '../hooks/useCleanLocalStorageVars.js';
import { Container, Grid, Alert, Button, Box } from '@mui/material';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchAIResults.js';
import LinearWithValueLabel from '../components/linearProgress.js';
import SearchBar from '../components/searchBar.js'
import buscadorService from '../services/buscador.js';
import busquedaAvanzadaService from '../services/busqueda_avanzada.js';
import { filtroByDefault, validarfiltroJurisprudencial, getOpcionesAutocompletar, setLocalStorageWithExpiry, getLocalStorageWithExpiry } from '../helpers/utils.js';
import dataResults from '../data_results/dataResBusqueda.js';
import '../App.css';

export default function SearchResults() {

  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const stringParam = decodeURIComponent(searchParams.get('string'));

  const [datos, setDatos] = useState([]);
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [stringQueryLs, setStringQueryLs] = useState("");

  const { ttl } = useContext(Context);
  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);

  // Esta funcion permite configurar el mensaje de error o exito en variable message
  const handleMessage = (newMessage) => {
    setTimeout(function(){ 
        setMessage(newMessage);
    }, 3000);
  };

  // Esta funcion obtiene los resultados de busqueda por buscador normal al AI 
  const getResultadosBuscadorAI = (string) => {
    let newMessage = {}; 
    buscadorService
      .getSearchQData(string)
      .then(response => {
          if((response.status_info.status === 200) && (response.data.length > 0)) {
              const newDatos = dataResults(response.data);
              setDatos(newDatos);
              setSearchOptions(getOpcionesAutocompletar(newDatos));
              setLocalStorageWithExpiry('dataFromQueryLs', JSON.stringify(newDatos), ttl);
              newMessage["message"] = `${response.status_info.reason}`;
              newMessage["classname"] = 'success';
          } else if(response.status_info.status === 500) {
              setLocalStorageWithExpiry('stringQueryLs', '', ttl);
              setLocalStorageWithExpiry('dataFromQueryLs', '', ttl);
              newMessage["message"] = `${response.status_info.reason}`;
              newMessage["classname"] = 'error';
          } else {
            setLocalStorageWithExpiry('stringQueryLs', '', ttl);
            setLocalStorageWithExpiry('dataFromQueryLs', '', ttl);
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
  const getResultadosBuscadorAV = () => {
      let newMessage = {}; 
      busquedaAvanzadaService
        .getAllResultsBusquedaAV({})
        .then(response => {
              if((response.status_info.status === 200) && (response.data.length > 0)) {
                const newDatos = dataResults(response.data);
                setDatos(newDatos);
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

  // Si no hay datos en la consulta, se establece el filtro jurisprudencial por defecto
  useEffect(() => {
    if(datos.length === 0){
        setFiltroJurisprudencial(filtroByDefault);
    } 
  }, []);

  // Este useEffect cambia el estado de contexto estadoVerTodasDecisiones a false
  useEffect(()=>{
    setEstadoVerTodasDecisiones(false);
  },[]);
  
  // Si la seccion /resultados-busqueda no cuenta con ningun parametro, lo envia al home
  useEffect(() => {
    const url = window.location.href;  
    const tieneParametros = url.includes('?');
    if (!tieneParametros) {
      navigate("/");
    } 
  },[]);
  
  // Este useEffect almacena la cadena de consulta en el localStorage
  // Los datos obtenidos a partir de la cadena de consulta se almacenan en localStorage
  // Si el stringQuery recien ingresado es el mismo que esta en localStorage.stringQueryLs toma los datos almacenados del sesionStorage 
  // En caso contrario, una consulta diferente procede a obtener nuevos registros.
  useEffect(()=>{
    if (!localStorage.hasOwnProperty('stringQueryLs')) {
      setLocalStorageWithExpiry('stringQueryLs', '', ttl);
      setLocalStorageWithExpiry('dataFromQueryLs', '', ttl);
    } else {
      if(stringQuery.length > 0 ){
        if((stringQuery === getLocalStorageWithExpiry('stringQueryLs')) && localStorage.hasOwnProperty('dataFromQueryLs')){
          setDatos(JSON.parse(getLocalStorageWithExpiry('dataFromQueryLs')));
        } else {
          getResultadosBuscadorAI(stringQuery);
          setLocalStorageWithExpiry('stringQueryLs', stringQuery, ttl);
          setStringQueryLs(stringQuery);
        }
      }
    }
  },[stringQuery]);
  
  // Este useEffect valida si no hay parametros de busqueda
  // Si se cumple, limpia los valores del localStorage: stringQueryLs y dataFromQueryLs
  // Si se cumple tambien redirige a la pagina principal
  // Si no se cumple, se establece el stringQuery con el valor del stringParam
  useEffect(() => {
    if ((stringParam === "") || (stringParam === null) || (stringParam === "null")) {
      let newMessage = {};
      newMessage["message"] = `No se puede realizar la solicitud.`;
      newMessage["classname"] = 'error';
      handleMessage(newMessage);
      setDatos([]);
      setLocalStorageWithExpiry('stringQueryLs', '', ttl);
      setLocalStorageWithExpiry('dataFromQueryLs', '', ttl);
      navigate('/');
    } else {
      if(stringQuery === ""){
        setStringQuery(stringParam);
      } 
    }
  }, [stringQuery, stringParam ]);
  
  // Si el filtroJurisprudencial como variable de contexto es un objeto vacio, tambien se limpia el estado de selectedFilters
  useEffect(() => {
    if(validarfiltroJurisprudencial(filtroJurisprudencial)){ 
        setSelectedFilters([]);
    } 
  }, [filtroJurisprudencial]);

  // Esta funcion limpia las variables LocalStorage almacenadas despues de cierto tiempo
  useCleanLocalStorageVars();

  return (
    <>
      {(datos.length === 0) ?
        <Container className="margin_bottom_m">
          <h1 className="text_center margin_top_l">Resultados de Búsqueda</h1>  
          <p className="text_center"></p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <>
              <p>Buscando por: <strong>"{stringParam}"</strong></p>
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
                  <a href="/" target='_self' rel="noreferrer">
                      <Button className="button_primary margin_xs card_size_small">Realiza una nueva búsqueda</Button>
                  </a> 
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
              <p></p>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
              <SearchBar isSearchAdvance={true}/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Filter setSelectedFilters={setSelectedFilters}></Filter>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <ListCardSearch datosBusqueda={datos} selectedTerm={stringQuery} searchOptions={searchOptions} selectedFilters={selectedFilters}></ListCardSearch>
            </Grid>
          </Grid>
        </Container>
      }
    </>  
  );
}
