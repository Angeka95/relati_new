import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import enfoqueGeneroService from '../services/enfoque_genero.js';
import { removeFragmentoInString, getOpcionesAutocompletar, obtenerPalabrasFromArrayObject, obtenerAnio, truncateWithEllipsis } from '../helpers/utils.js';
import { Container, Grid, Alert } from '@mui/material';
//import ListCardSearch from '../components/listCardSearchAIResults.js';
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
                            ficha_id: item.id,
                            providencia_id: item.id,
                            fecha: item.fecha_providencia,
                            anio: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                            asuntoNombreCaso: "",
                            asuntoCasoEllipsed: ((item.nombre !== null)) ? truncateWithEllipsis(item.nombre) : "", 
                            asuntoNombre: ((item.nombre !== null)) ? item.nombre : "",
                            nombre: ((item.nombre !== null)) ? item.nombre : "",
                            actuacion: (item.hasOwnProperty("actuacion")) && (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, false) : "",
                            caso:  (item.casopro.length > 0 ) ? obtenerPalabrasFromArrayObject(item.casopro, "caso", null, false) : "",
                            sala: (item.despacho.length > 0) ? obtenerPalabrasFromArrayObject(item.despacho, "nombre", null, false) : "",
                            salaDescripcion:  (item.despacho.length > 0) ? obtenerPalabrasFromArrayObject(item.despacho, "nombre", null, false) : "",
                            salaId: (item.despacho.length > 0) ? obtenerPalabrasFromArrayObject(item.despacho, "id", null, false) : "",
                            asuntoCaso: ((item.nombre !== null)) ? truncateWithEllipsis(item.nombre) : "", 
                            departamentoId: "",
                            providencia: "",
                            departamentoNombre: (item.departamento_ext.length > 0) ? removeFragmentoInString("DEPARTAMENTO", item.departamento_ext[0].nombre_dpto) : "",
                            hipervinculo:   (item.hipervinculo !== null ) ? `https://relatoria.jep.gov.co/${item.hipervinculo}` : "", 
                            comparecientes:  (item.tipopeti.length > 0) ? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "", 
                            delitos: (item.delitos.length > 0) ? obtenerPalabrasFromArrayObject(item.delitos, "delito", null, false) : "", 
                            procedimientos: (item.hasOwnProperty("actuacion")) && (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, false) : "", 
                            palabrasClave: "",
                            municipio: "",
                            palabrasClaveBuscador: "",
                            palabrasClaveFichaJuridica: "",
                        };
                        newItem["asuntoNombreCaso"] = `${newItem["asuntoNombre"]}`;
                        newItem["palabrasClave"] = `${newItem["delitos"]}, ${newItem["comparecientes"]}, ${newItem["procedimientos"]}`;
                        newItem["autocompletarBuscador"] = { 
                              id: newItem.id, 
                              title: `${newItem["providencia_id"]} - ${newItem["asuntoNombreCaso"]} ${newItem["sala"]} ${newItem["departamentoNombre"]} ${newItem["delitos"]}, ${newItem["comparecientes"]}, ${newItem["procedimientos"]}`}; 
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
