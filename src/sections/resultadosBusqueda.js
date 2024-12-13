import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchAIResults.js';
import '../App.css';
import { Container, Grid, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import buscadorService from '../services/buscador.js';
import ProcessingDataModal from '../components/processingDataModal.js';
import LinearWithValueLabel from '../components/linearProgress.js';  

export default function SearchResults() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("");
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [datos, setDatos] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const stringParam = decodeURIComponent(searchParams.get('string'));

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
          .then(response => {
              if((response.status_info.status === 200) && (response.data.length > 0)) {
                    console.log("Total datos:", response.data.length);
                    const newDatos = response.data.map(i => { 
                        let item = i._source;
                        return {
                            salaOSeccion: (item.sala_seccion !== null) ? item.sala_seccion : "",
                            nombreDecision: (item.nombre_providencia !== null) ? item.nombre_providencia : "",
                            procedimiento: (item.procedimiento.length > 0) ? item.procedimiento[0].nombre : "", 
                            expediente: "", 
                            departamento: (item.departamento.length > 0) ? item.departamento[0].nombre : "", 
                            magistrado: (item.autor !== null) ? item.autor : "", 
                            municipio: "", 
                            delito: (item.delito.length > 0) ? item.delito[0].nombre : "", 
                            anioHechos: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                            tipo: (item.tipo_documento !== null) ? item.tipo_documento : "", 
                            radicado: (item.radicado_documento !== null) ? item.radicado_documento : "",
                            compareciente:  (item.compareciente !== null) ? item.compareciente : "",
                            tipoSujeto: (item.tipo_compareciente.length > 0) ? item.tipo_compareciente[0].tipo : "", 
                            accionadoVinculado: "", 
                            palabrasClaves:  (item.palabras_clave.length > 0) ? item.palabras_clave[0].palabra : "", 
                            hechos: (item.hechos_antecedentes !== null) ? item.hechos_antecedentes : "", 
                            problemasJuridicos: (item.problema_juridico !== null) ? item.problema_juridico : "",
                            reglas: (item.reglas_juridicas !== null) ? item.reglas_juridicas : "",
                            aplicacionCasoConcreto: (item.analisis_caso_concreto !== null) ? item.analisis_caso_concreto : "", 
                            resuelve: (item.resuelve.length > 0) ? item.resuelve[0].nombre : "", 
                            documentosAsociados:  (item.anexos.length > 0) ? item.anexos[0].nombre : "", 
                            enfoquesDiferenciales: (item.enfoque.length > 0) ? item.enfoque[0].tipo : "",
                            notasRelatoria: "", //No mostrar  
                            hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co${item.hipervinculo}` : "", 
                            hipervinculoFichaJuris:   (item.ficha_id !== null ) ? `https://relatoria.jep.gov.co/downloadfichaext/${item.ficha_id}` : "",
                            estadoFichaJuris: false,
                            extractoBusqueda: ""
                        };
                  });
                  setDatos(newDatos);
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
      setTimeout(() => {
        navigate('/');
      }, 7000);
      return;
    } 
    if(stringQuery !== ""){
      getResultadosBuscadorAI(stringQuery);
    } else {
      setStringQuery(stringParam);
    }
  }, [stringQuery, stringParam]);

  /*useEffect(() => {
    if(message.message !== "" ){
      console.log("Message...", message);
      setTimeout(() => {
        setMessage({ message: "", classname: "" });
      }, 10000);
    } 
  }, [message]);*/

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
          <p></p>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
          <SearchBar></SearchBar>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Filter setSelectedFilters={setSelectedFilters}></Filter>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {(datos.length === 0) ?
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
             :  
              <ListCardSearch datosBusqueda={datos} selectedFilters={selectedFilters}></ListCardSearch>
          }
        </Grid>
      </Grid>
      {/*<ProcessingDataModal openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>*/}
    </Container>
  );
}
