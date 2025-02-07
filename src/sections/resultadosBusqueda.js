import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchAIResults.js';
import { Container, Grid, Alert } from '@mui/material';
import buscadorService from '../services/buscador.js';
import LinearWithValueLabel from '../components/linearProgress.js';  
import Context from '../context/context.js';
import { filtroByDefault, removeFragmentoInString, getOpcionesAutocompletar, obtenerPalabrasFromArrayObject, validarfiltroJurisprudencial } from '../helpers/utils.js';
import '../App.css';
import datos_resultados_AI_test_beta from '../data/data_busqueda_AI_test_beta';

export default function SearchResults() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [datos, setDatos] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);
  const { stringQuery, setStringQuery } = useContext(Context);
  
  const [stringQueryLs, setStringQueryLs] = useState("");
  const [dataFromQueryLs, setDataFromQueryLs] = useState("");
  
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const stringParam = decodeURIComponent(searchParams.get('string'));
  
  useEffect(()=>{
    console.log("stringQueryLs:", stringQueryLs, "stringQuery:", stringQuery);
    if (!localStorage.hasOwnProperty('stringQueryLs')) {
      localStorage.setItem('stringQueryLs', '');
      localStorage.setItem('dataFromQueryLs', '');
    } else {
    
      if(stringQuery.length > 0 ){
        console.log(stringQuery, localStorage.getItem('stringQueryLs'))
        if(stringQuery === localStorage.getItem('stringQueryLs')){
          let newArray = localStorage.getItem('dataFromQueryLs');
          console.log(newArray);
          //setDatos(JSON.parse(localStorage.getItem('dataFromQueryLs')));
        } else {
          localStorage.setItem('stringQueryLs', stringQuery);
          localStorage.setItem('dataFromQueryLs', dataFromQueryLs);
          setStringQueryLs(stringQuery);
        }
      }
      /*setStringQueryLs(localStorage.getItem('stringQueryLs')); 
      console.log("strniquer", stringQueryLs);
      if(stringQuery.length > 0 ){
        if(stringQueryLs.length === 0) {
        console.log("eenntra");
          localStorage.setItem('stringQueryLs', stringQuery);
        }
        if(stringQuery === stringQueryLs){
          console.log("Son iguales");
          setDataFromQueryLs(JSON.parse(localStorage.getItem('dataFromQueryLs'))); 
          setDatos(JSON.parse(localStorage.getItem('dataFromQueryLs')));
        } else {
          console.log("Son diferentes");
          localStorage.setItem('stringQueryLs', stringQuery);
          localStorage.setItem('dataFromQueryLs', JSON.stringify(datos));
        }
      }*/
    }
  },[stringQuery, dataFromQueryLs]);
  
  useEffect(()=>{
      setEstadoVerTodasDecisiones(false);
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
  
  const getResultadosBuscadorAI = (string) => {
        let newMessage = {}; 
        buscadorService
          .getSearchQData(string)
          //.getSearchQDataTest(string)
          .then(response => {
              if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const newDatos = response.data.map((i, k) => { 
                        let item = i._source;
                        let newItem = {
                            id: k + 1,
                            score: i._score,
                            fecha: item.fecha_documento,
                            ficha_id: item.ficha_id,
                            providencia_id: item.providencia_id,
                            salaOSeccion: (item.sala_seccion !== null) ? item.sala_seccion : "",
                            sala: (item.sala_seccion !== null) ? item.sala_seccion : "",
                            nombreDecision: (item.nombre_providencia !== null) ? item.nombre_providencia : "",
                            procedimiento: (item.procedimiento.length > 0) ? item.procedimiento[0].nombre : "", 
                            procedimientos: (item.procedimiento.length > 0) ? item.procedimiento[0].nombre : "", 
                            expediente: "", 
                            departamento: (item.departamento.length > 0) ? obtenerPalabrasFromArrayObject(item.departamento, "nombre", null, false) : "",
                            departamentoNombre: (item.departamento.length > 0) ? removeFragmentoInString("DEPARTAMENTO", item.departamento[0].nombre) : "",
                            magistrado: (item.autor !== null) ? item.autor : "", 
                            municipio: "", 
                            delito: (item.delito.length > 0) ? obtenerPalabrasFromArrayObject(item.delito, "nombre", null, false) : "", 
                            delitos: (item.delito.length > 0) ? obtenerPalabrasFromArrayObject(item.delito, "nombre", null, false) : "", 
                            anioHechos: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                            anio: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                            tipo: (item.tipo_documento !== null) ? item.tipo_documento : "", 
                            radicado: (item.radicado_documento !== null) ? item.radicado_documento : "",
                            compareciente:  (item.compareciente !== null) ? item.compareciente : "",
                            comparecientes:  (item.tipo_compareciente.length > 0) ? obtenerPalabrasFromArrayObject(item.tipo_compareciente, "tipo", null, false) : "", 
                            tipoSujeto: (item.tipo_compareciente.length > 0) ? obtenerPalabrasFromArrayObject(item.tipo_compareciente, "tipo", null, false) : "", 
                            accionadoVinculado: "", 
                            palabrasClaves:  (item.palabras_clave.length > 0) ? item.palabras_clave[0].palabra : "", 
                            hechos: (item.hechos_antecedentes !== null) ? item.hechos_antecedentes : "", 
                            problemasJuridicos: (item.problema_juridico !== null) ? item.problema_juridico : "",
                            reglas: (item.reglas_juridicas !== null) ? item.reglas_juridicas : "",
                            aplicacionCasoConcreto: (item.analisis_caso_concreto !== null) ? item.analisis_caso_concreto : "", 
                            resuelve: (item.resuelve.length > 0) ? item.resuelve[0].nombre : "", 
                            documentosAsociados:  (item.anexos.length > 0) ? item.anexos[0].nombre : "", 
                            documentosAsociadosLink:  (item.anexos.length > 0) ? item.anexos[0].hipervinculo : "", 
                            enfoquesDiferenciales: (item.enfoque.length > 0) ? item.enfoque[0].tipo : "",
                            notasRelatoria: "", //No mostrar  
                            hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "", 
                            hipervinculoFichaJuris:   (item.ficha_id !== null ) ? `https://relatoria.jep.gov.co/downloadfichaext/${item.ficha_id}` : "",
                            estadoFichaJuris: false,
                            extractoBusqueda: "",
                            caso: (item.macrocaso.length > 0) ? item.macrocaso[0].nombre : "",
                        };
                        newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.salaOSeccion} ${newItem.delitos} ${newItem.procedimientos} ${newItem.compareciente} ${newItem.tipoSujeto} ${newItem.departamentoNombre} ${newItem.nombreDecision} ${newItem.magistrado}`}; 
                        return newItem;
                  });
                  setDatos(newDatos);
                  setSearchOptions(getOpcionesAutocompletar(newDatos));
                  setDataFromQueryLs(JSON.stringify(newDatos));
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

  useEffect(() => {
    if (!stringParam) {
      let newMessage = {};
      newMessage["message"] = `No se puede realizar la solicitud.`;
      newMessage["classname"] = 'error';
      handleMessage(newMessage);
      setDatos([]);
      /*
      setTimeout(() => {
        navigate('/');
      }, 7000);*/
      return;
    } else {
      if(stringQuery === ""){
        setStringQuery(stringParam);
      } else {
        getResultadosBuscadorAI(stringQuery);
        
      }
    }
  }, [stringQuery, stringParam ]);
  
  useEffect(() => {
    if(datos.length === 0){
        setFiltroJurisprudencial(filtroByDefault);
    } 
  }, []);

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
                <Alert variant="outlined" severity={message.classname}>
                {message.message}
                </Alert> 
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
                <ListCardSearch datosBusqueda={datos} selectedTerm={stringQuery} searchOptions={searchOptions} selectedFilters={selectedFilters}></ListCardSearch>
            </Grid>
          </Grid>
        </Container>
      }
    </>
    
  );
}
