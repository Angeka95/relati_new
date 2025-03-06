import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchAIResults.js';
import DOMPurify from 'dompurify';
import { Container, Grid, Alert, Box, Button } from '@mui/material';
import buscadorService from '../services/buscador.js';
import LinearWithValueLabel from '../components/linearProgress.js';  
import Context from '../context/context.js';
import { filtroByDefault, removeFragmentoInString, getOpcionesAutocompletar, obtenerPalabrasFromArrayObject, validarfiltroJurisprudencial } from '../helpers/utils.js';
import '../App.css';

export default function VerTodasLasDecisiones() {

  const navigate = useNavigate();
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
                    const newDatos = response.data.data.map((i, k) => { 
                      let item = i;
                      let newItem = {
                          id: k + 1,
                          fecha: item.fecha_providencia,
                          ficha_id: item.id,
                          providencia_id: ((item.getfichas.length > 0 ) && (item.getfichas[0].id !== null))  ?  item.getfichas[0].id : "",
                          sala: (item.despacho) ? item.despacho.nombre : "",
                          salaOSeccion: (item.despacho) ? item.despacho.nombre : "",
                          nombreDecision: ((item.nombre !== null)) ? item.nombre : "",
                          procedimiento: (item.hasOwnProperty("actuacion")) && (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, false) : "", 
                          expediente: "",
                          departamento: (item.departamento_ext.length > 0) ? removeFragmentoInString("DEPARTAMENTO", item.departamento_ext[0].nombre_dpto) : "",
                          magistrado: (item.magistrado.length > 0) ? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "", //Requiere nombre
                          municipio:  (item.municipio_ext.length > 0) ? removeFragmentoInString("MUNICIPIO", item.municipio_ext[0].nombre_muni) : "",
                          delito: (item.delitos.length > 0) ? obtenerPalabrasFromArrayObject(item.delitos, "delito", null, false) : "", 
                          anioHechos: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                          tipo: (item.documento.length > 0) ? obtenerPalabrasFromArrayObject(item.documento, "nombre", null, false) : "", 
                          radicado: (item.radicado !== null) ? item.radicado : "",
                          compareciente:  ((item.getfichas.length > 0 ) && (item.getfichas[0].compareciente !== null))  ?  item.getfichas[0].compareciente : "", 
                          tipoSujeto: (item.tipopeti.length > 0) ? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "", 
                          accionadoVinculado: (item.hasOwnProperty("accionadoVinculado") && (item.accionadoVinculado !== null )) ? item.accionadoVinculado : "",
                          palabrasClaves:  (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "", 
                          hechos:  (item.hasOwnProperty("hechos_antecedentes") && (item.hechos_antecedentes !== null)) ? item.hechos_antecedentes : "", 
                          problemasJuridicos: ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_descripcion !== null))  ?  item.getfichas[0].sintesis_descripcion : "",
                          reglas: (item.hasOwnProperty("reglas_juridicas") && (item.reglas_juridicas !== null)) ? item.reglas_juridicas : "",
                          aplicacionCasoConcreto: (item.hasOwnProperty("analisis_caso_concreto") && (item.analisis_caso_concreto !== null)) ? item.analisis_caso_concreto : "", 
                          resuelve:  (item.hasOwnProperty("resuelve") && (item.resuelve !== null )) ? item.resuelve : "",
                          documentosAsociados: (item.hasOwnProperty("anexos") && (item.anexos.length > 0)) ? item.anexos[0].nombre : "", 
                          documentosAsociadosLink:  (item.hasOwnProperty("anexos") && (item.anexos.length > 0)) ? item.anexos[0].hipervinculo : "", 
                          enfoquesDiferenciales: (item.hasOwnProperty("enfoque") && (item.enfoque !== null )) ? item.enfoque : "",
                          notasRelatoria: "", 
                          hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "", 
                          hipervinculoFichaJuris: "",
                          estadoFichaJuris: false,
                          extractoBusqueda:  ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_titulo !== null))  ?  item.getfichas[0].sintesis_titulo : "",
                          caso: (item.casopro.length > 0 ) ? obtenerPalabrasFromArrayObject(item.casopro, "caso", null, false) : "",
                          autocompletarBuscador: "",
                          estado_id: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id !== null))  ?  item.getfichas[0].estado_id : "",
                          conclusion_resuelve: ((item.conclusion_resuelve !== null) && (item.hasOwnProperty("conclusion_resuelve"))) ? item.conclusion_resuelve : "", 
                          analisis: ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_titulo !== null))  ?  item.getfichas[0].sintesis_titulo : "",
                      };
                      newItem["departamentoNombre"] = newItem.departamento;
                      newItem["procedimientos"] = newItem.procedimiento; 
                      newItem["anio"] = newItem.anioHechos;
                      newItem["comparecientes"] = newItem.compareciente;
                      newItem["delitos"] = newItem.delito;
                      newItem["hechos"] =  DOMPurify.sanitize(newItem.analisis, { ALLOWED_TAGS: [] });
                      newItem["hipervinculoFichaJuris"] = ((newItem.providencia_id !== null) && ( newItem.estado_id === 14 )) ? `https://relatoria.jep.gov.co/downloadfichaext/${newItem.providencia_id}` : " ";
                      newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.salaOSeccion} ${newItem.nombreDecision} ${newItem.departamento} ${newItem.delito} ${newItem.procedimiento} ${newItem.compareciente} ${newItem.magistrado}`};  
                      return newItem;
                });
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
    if(datos.length === 0){
      getAllResults(stringParamPage, stringParamPerPage);
      setFiltroJurisprudencial(filtroByDefault);
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
