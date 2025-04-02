import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Alert, Box, Button } from '@mui/material';
import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchVTDResults.js';
import LinearWithValueLabel from '../components/linearProgress.js'; 
import buscadorService from '../services/buscador.js';
import Context from '../context/context.js';
import { filtroByDefault, getOpcionesAutocompletar, validarfiltroJurisprudencial, validateSearchParamsVTD } from '../helpers/utils.js';
import dataResults from '../data_results/dataResVerTodasLasDecisiones.js';
import '../App.css';

export default function VerTodasLasDecisiones() {

  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("Ver todas las decisiones");
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [datos, setDatos] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [pagination, setPagination] = useState({});

  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);
  
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const stringParamPage = (searchParams.get('page')) ? decodeURIComponent(searchParams.get('page')) : 1;
  const stringParamPerPage = (searchParams.get('per_page')) ? decodeURIComponent(searchParams.get('per_page')) : 10;
  
  useEffect(()=>{
      setEstadoVerTodasDecisiones(true);
  },[]);

  const handleMessage = (newMessage) => {
      handleOpenModal();
      setTimeout(function(){ 
          handleCloseModal();
          setMessage(newMessage);
      }, 3000);
      /*setTimeout(() => {
          setMessage({ message: "", classname: "" }); 
      }, 6000);*/
  }
  
  const getAllResults = (page, per_page) => {
        let newMessage = {}; 
        buscadorService
          .getAllResults(page, per_page)
          .then(response => {
              if((response.status_info.status === 200) && (response.data.data.length > 0)) {
                    let objPagination = Object.assign({}, response.data);
                    delete objPagination.data;
                    objPagination["per_page"] = Number(objPagination["per_page"]);
                    setPagination(objPagination);
                    const newDatos = dataResults( response.data.data );
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
            console.log("falla de la promesa");
            newMessage["message"] = `${error}`;
            newMessage["classname"] = 'error';
            handleMessage(newMessage);
        });
  };
  
  const getAllResultsByFilter = (searchParamsObj) => {
    let newMessage = {}; 
    buscadorService
      .getAllResultsByFilter(searchParamsObj)
      .then(response => {
          if((response.status_info.status === 200) && (response.data.length > 0)) {
                const newDatos = dataResults( response.data);
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
        console.log("falla de la promesa");
        newMessage["message"] = `${error}`;
        newMessage["classname"] = 'error';
        handleMessage(newMessage);
    });
};
  
  useEffect(() => {
  const searchParamsObj = Object.fromEntries(searchParams.entries());
    if(datos.length === 0){
      if(validateSearchParamsVTD(searchParamsObj)) { 
        getAllResultsByFilter(searchParamsObj);
      } else {
        getAllResults(stringParamPage, stringParamPerPage);
        setFiltroJurisprudencial(filtroByDefault);
      }
    }  
  }, []);

  return (
    <>
      {(datos.length === 0) ?
        <Container className="margin_bottom_m">
          <h1 className="text_center margin_top_l">Todas Las Decisiones</h1>  
          <p className="text_center"></p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <>
              {/*<p>Página: <strong>{stringParamPage}</strong></p>*/}
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
                  <a href="/ver-todas-las-decisiones" target='_self' rel="noreferrer">
                      <Button className="button_primary margin_xs card_size_small">Intenta nuevamente</Button>
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
              <SearchBar/>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Filter setSelectedFilters={setSelectedFilters}></Filter> 
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <ListCardSearch datosBusqueda={datos} selectedTerm={stringQuery} searchOptions={searchOptions} selectedFilters={selectedFilters} customPagination={pagination}></ListCardSearch>
            </Grid>
          </Grid>
        </Container>
      }
    </>
    
  );
}
