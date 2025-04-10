import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Context from '../../context/context.js';
import { Container, Grid, Alert, Button, TextField, Stack, Autocomplete, Box, responsiveFontSizes, Divider } from '@mui/material';
import busquedaAvanzadaService from '../../services/busqueda_avanzada.js';
import LinearWithValueLabel from '../../components/linearProgress.js';  
import Filter from '../../components/filter.js';
import SearchBar from '../../components/searchBar.js';
import ListCardSearch from '../../components/listCardSearchAIResults.js';
import { filtroByDefault, validarfiltroJurisprudencial, sanitizeString, getOpcionesAutocompletar } from '../../helpers/utils.js';
import dataResults from '../../data_results/dataResBusqueda.js';
import '../../App.css';

const ResultadosBusquedaAV = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const stringParam = decodeURIComponent(searchParams.get('string'));

  const [datos, setDatos] = useState([]);
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);

  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);

  const handleMessage = (newMessage) => {
    setTimeout(function(){ 
        setMessage(newMessage);
    }, 3000);
  };
  
  const getResultados = () => {
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

  useEffect(() => {
    if(datos.length === 0){
        getResultados();
    } 
  }, [datos]);
    
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
            { (message.message === "") ?
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
           <Divider/>
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

};

export default ResultadosBusquedaAV;