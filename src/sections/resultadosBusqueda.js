import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchAIResults.js';
import { Container, Grid, Alert, Button, Box } from '@mui/material';
import buscadorService from '../services/buscador.js';
import LinearWithValueLabel from '../components/linearProgress.js';  
import Context from '../context/context.js';
import { filtroByDefault, removeFragmentoInString, getOpcionesAutocompletar, obtenerPalabrasFromArrayObject, validarfiltroJurisprudencial } from '../helpers/utils.js';
import '../App.css';

export default function SearchResults() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [datos, setDatos] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);
  const [stringQuery, setStringQuery] = useState("");
  
  const [stringQueryLs, setStringQueryLs] = useState("");
  
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const stringParam = decodeURIComponent(searchParams.get('string'));
  
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
                        sala: (item.sala_seccion !== null) ? item.sala_seccion : "",
                        salaOSeccion: (item.sala_seccion !== null) ? item.sala_seccion : "",
                        nombreDecision: (item.nombre_providencia !== null) ? item.nombre_providencia : "",
                        procedimiento: (item.procedimiento.length > 0) ? obtenerPalabrasFromArrayObject(item.procedimiento, "nombre", null, false) : "",
                        expediente: (item.expediente !== null) ? item.expediente : "", 
                        departamento: (item.departamento.length > 0) ? obtenerPalabrasFromArrayObject(item.departamento, "nombre", null, false) : "",
                        magistrado: (item.autor !== null) ? item.autor : "", 
                        municipio:  (item.municipio.length > 0) ? obtenerPalabrasFromArrayObject(item.municipio, "nombre", null, false) : "",
                        delito: (item.delito.length > 0) ? obtenerPalabrasFromArrayObject(item.delito, "nombre", null, false) : "", 
                        anioHechos: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                        tipo: (item.tipo_documento !== null) ? item.tipo_documento : "", 
                        radicado: (item.radicado_documento !== null) ? item.radicado_documento : "",
                        compareciente: (item.tipo_compareciente.length > 0) ? obtenerPalabrasFromArrayObject(item.tipo_compareciente, "tipo", null, false) : "", 
                        tipoSujeto: "", 
                        accionadoVinculado: "", 
                        palabrasClaves:  (item.palabras_clave.length > 0) ? obtenerPalabrasFromArrayObject(item.palabras_clave, "palabra", null, false) : "",
                        hechos: (item.hechos_antecedentes !== null) ? item.hechos_antecedentes : "", 
                        problemasJuridicos: (item.problema_juridico !== null) ? item.problema_juridico : "",
                        reglas: (item.reglas_juridicas !== null) ? item.reglas_juridicas : "",
                        aplicacionCasoConcreto: (item.analisis_caso_concreto !== null) ? item.analisis_caso_concreto : "", 
                        resuelve: (item.resuelve.length > 0) ? obtenerPalabrasFromArrayObject(item.resuelve, "nombre", null, false) : "",
                        documentosAsociados:  (item.anexos.length > 0) ? item.anexos[0].nombre : "", 
                        documentosAsociadosLink:  (item.anexos.length > 0) ? item.anexos[0].hipervinculo : "", 
                        enfoquesDiferenciales: (item.enfoque.length > 0) ? item.enfoque[0].tipo : "",
                        notasRelatoria: "", 
                        hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "", 
                        hipervinculoFichaJuris: "",
                        estadoFichaJuris: false,
                        extractoBusqueda: (item.sintesis > 0) ? item.sintesis : "",
                        caso: (item.macrocaso.length > 0) ? item.macrocaso[0].nombre : "",
                        autocompletarBuscador: "",
                        estado_id: (item.estado_id > 0) ? item.estado_id : ""
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
              sessionStorage.setItem('dataFromQueryLs', JSON.stringify(newDatos));
              newMessage["message"] = `${response.status_info.reason}`;
              newMessage["classname"] = 'success';
          } else if(response.status_info.status === 500) {
              localStorage.setItem('stringQueryLs', '');
              sessionStorage.setItem('dataFromQueryLs', '');
              newMessage["message"] = `${response.status_info.reason}`;
              newMessage["classname"] = 'error';
          } else {
            localStorage.setItem('stringQueryLs', '');
            sessionStorage.setItem('dataFromQueryLs', '');
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

const handleMessage = (newMessage) => {
  handleOpenModal();
  setTimeout(function(){ 
      setMessage(newMessage);
  }, 3000);
  /*setTimeout(() => {
      setMessage({ message: "", classname: "" }); 
  }, 6000);*/
};
  
  // Si la seccion /resultados-busqueda no cuenta con ningun parametro, lo envia al home
  useEffect(() => {
    const url = window.location.href;  
    const tieneParametros = url.includes('?');
    if (!tieneParametros) {
      navigate("/");
    } 
  },[]);
  
  /* Este useEffect almacena la cadena de consulta en el localStorage
     Los datos obtenidos a partir de la cadena de consulta se almacenan en sessionStorage
     Si el stringQuery recien ingresado es el mismo que esta en localStorage.stringQueryLs toma los datos almacenados del sesionStorage 
     En caso contrario, una consulta diferente procede a obtener nuevos registros.
  */
  useEffect(()=>{
    if (!localStorage.hasOwnProperty('stringQueryLs')) {
      localStorage.setItem('stringQueryLs', '');
      sessionStorage.setItem('dataFromQueryLs', '');
    } else {
      if(stringQuery.length > 0 ){
        console.log(stringQuery, localStorage.getItem('stringQueryLs'))
        if(stringQuery === localStorage.getItem('stringQueryLs')){
          setDatos(JSON.parse(sessionStorage.getItem('dataFromQueryLs')));
        } else {
          getResultadosBuscadorAI(stringQuery);
          localStorage.setItem('stringQueryLs', stringQuery);
          setStringQueryLs(stringQuery);
        }
      }
    }
  },[stringQuery]);
  
  useEffect(()=>{
      setEstadoVerTodasDecisiones(false);
  },[]);
    
  useEffect(() => {
    if (!stringParam){
      let newMessage = {};
      newMessage["message"] = `No se puede realizar la solicitud.`;
      newMessage["classname"] = 'error';
      handleMessage(newMessage);
      setDatos([]);
      localStorage.setItem('stringQueryLs', '');
      sessionStorage.setItem('dataFromQueryLs', '');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      if(stringQuery === ""){
        setStringQuery(stringParam);
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
