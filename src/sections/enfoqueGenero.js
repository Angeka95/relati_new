import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import enfoqueGeneroService from '../services/enfoque_genero.js';
import { removeFragmentoInString, getOpcionesAutocompletar, obtenerPalabrasFromArrayObject, truncateWithEllipsis } from '../helpers/utils.js';
import { Container, Grid, Alert } from '@mui/material';
import ListCardSearch from '../components/listCardSearchEnfoqueGenero.js';
import LinearWithValueLabel from '../components/linearProgress.js';  
import '../App.css';

export default function EnfoqueGenero() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("Enfoque de Género");
  const [message, setMessage] = useState({ message: "", classname: "" });
  const [datos, setDatos] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

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

  const getNewListDptos = (dptosList) => {
    return dptosList.map( departamento => {
        return {
            ...departamento, dpto: removeFragmentoInString("DEPARTAMENTO", departamento.dpto)
        }
    });
  };
  
  const getResultadosEnfoqueGenero = () => {
        let newMessage = {}; 
        enfoqueGeneroService
          .getEnfoqueGeneroData()
          .then(response => {
              if((response.status_info.status === 200) /*&& (response.data.length > 0)*/) {
                    const newDatos = response.data.map((i, k) => { 
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
                            compareciente: (item.tipopeti.length > 0) ? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "", 
                            tipoSujeto: (item.hasOwnProperty("tipo_compareciente") && (item.tipo_compareciente !== null )) ? item.tipo_compareciente : "", 
                            accionadoVinculado: (item.hasOwnProperty("accionadoVinculado") && (item.accionadoVinculado !== null )) ? item.accionadoVinculado : "",
                            palabrasClaves: (item.hasOwnProperty("palabras_clave") && (item.palabras_clave !== null )) ? item.palabras_clave : "",
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
                            estado_id: (item.estado_id > 0) ? item.estado_id : "",
                            conclusion_resuelve: ((item.conclusion_resuelve !== null) && (item.hasOwnProperty("conclusion_resuelve"))) ? item.conclusion_resuelve : "", // No tiene Conclusion Resuelve
                        };
                        newItem["departamentoNombre"] = newItem.departamento;
                        newItem["procedimientos"] = newItem.procedimiento; 
                        newItem["anio"] = newItem.anioHechos;
                        newItem["comparecientes"] = newItem.compareciente;
                        newItem["delitos"] = newItem.delito;
                        newItem["hipervinculoFichaJuris"] = ( newItem.ficha_id !== null ) ? `https://relatoria.jep.gov.co/downloadfichaext/${newItem.providencia_id}` : " ";
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
        getResultadosEnfoqueGenero(stringQuery);
        
      }
    }
  }, [stringQuery, stringParam ]);

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
      <Grid container spacing={2} className="justify_center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
          <div className="margin_bottom_m wrap justify_center  button_alphabet_container">
            <h1 className="width_100 text_center margin_top_l">Enfoque de Género</h1>
            <h5 className="width_100 text_center margin_bottom_m">Encuentre las decisiones de la JEP y actividad judicial basadas en enfoque de género</h5>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {(datos.length === 0) ?
              <>
              {/*<p>Resultados por <strong>"Enfoque de Género"</strong></p>*/}
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
              <ListCardSearch datosBusqueda={datos} selectedTerm={stringQuery} searchOptions={searchOptions} selectedFilters={selectedFilters}></ListCardSearch>
          }
        </Grid>
      </Grid>
      {/*<ProcessingDataModal openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>*/}
    </Container>
  );
}
