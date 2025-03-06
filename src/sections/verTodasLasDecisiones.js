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
              console.log("response", response);
              if((response.status_info.status === 200) && (response.data.data.length > 0)) {
                    let objPagination = Object.assign({}, response.data);
                    delete objPagination.data;
                    objPagination["per_page"] = Number(objPagination["per_page"]);
                    setPagination(objPagination);
                    const newDatos = response.data.data.map((i, k) => { 
                        let item = i._source;
                        let newItem = {
                            id: k + 1,
                            score: i._score,
                            fecha: item.fecha_documento,
                            ficha_id: item.ficha_id,
                            providencia_id: item.providencia_id,
                            sala: (item.sala_seccion !== null) ? item.sala_seccion : "",
                            salaOSeccion: (item.sala_seccion !== null) ? item.sala_seccion : "",
                            nombreDecision: (item.nombre_providencia !== null) ? item.nombre_providencia : "",
                            procedimiento: (item.procedimiento !== null ) ? item.procedimiento : "",
                            expediente: (item.expediente !== null) ? item.expediente : "", 
                            departamento: (item.departamento !== null ) ? item.departamento : "",
                            magistrado: (item.autor !== null) ? item.autor : "", 
                            municipio:  (item.municipio !== null ) ? item.municipio : "",
                            delito: (item.delito !== null ) ? item.delito : "",
                            anioHechos: (item.anio_hechos !== null ) ? item.anio_hechos : "",
                            tipo: (item.tipo_documento !== null) ? item.tipo_documento : "", 
                            radicado: (item.radicado_documento !== null) ? item.radicado_documento : "",
                            compareciente: (item.compareciente !== null ) ? item.compareciente : "",
                            tipoSujeto: (item.tipo_compareciente !== null ) ? item.tipo_compareciente : "",
                            accionadoVinculado: (item.accionadoVinculado !== null ) ? item.accionadoVinculado : "",
                            palabrasClaves: (item.palabras_clave !== null ) ? item.palabras_clave : "",
                            hechos: (item.hechos_antecedentes !== null) ? item.hechos_antecedentes : "", 
                            problemasJuridicos: (item.problema_juridico !== null) ? item.problema_juridico : "",
                            reglas: (item.reglas_juridicas !== null) ? item.reglas_juridicas : "",
                            aplicacionCasoConcreto: (item.analisis_caso_concreto !== null) ? item.analisis_caso_concreto : "", 
                            resuelve:  (item.resuelve !== null ) ? item.resuelve : "",
                            documentosAsociados: (item.anexos.length > 0) ? item.anexos[0].nombre : "", 
                            documentosAsociadosLink:  (item.anexos.length > 0) ? item.anexos[0].hipervinculo : "", 
                            enfoquesDiferenciales: (item.enfoque !== null ) ? item.enfoque : "",
                            notasRelatoria: "", 
                            hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "", 
                            hipervinculoFichaJuris: "",
                            estadoFichaJuris: false,
                            extractoBusqueda: (item.sintesis !== null ) ? item.sintesis : "",
                            caso: (item.macrocaso !== null ) ? item.macrocaso : "",
                            autocompletarBuscador: "",
                            estado_id: (item.estado_id > 0) ? item.estado_id : "",
                            conclusion_resuelve: (item.conclusion_resuelve !== null) ? item.conclusion_resuelve : "", 
                        };
                        newItem["departamentoNombre"] = newItem.departamento;
                        newItem["procedimientos"] = newItem.procedimiento; 
                        newItem["anio"] = newItem.anioHechos;
                        newItem["comparecientes"] = newItem.compareciente;
                        newItem["delitos"] = newItem.delito;
                        newItem["hipervinculoFichaJuris"] = ((newItem.ficha_id !== null ) && ( newItem.estado_id === 14 )) ? `https://relatoria.jep.gov.co/downloadfichaext/${newItem.ficha_id}` : " ";
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
