import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchAIResults.js';
import '../App.css';
import { Container, Grid, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import buscadorService from '../services/buscador.js';
import ProcessingDataModal from '../components/processingDataModal.js';

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

  const getResultadosBuscadorAI = (string) => {
        let newMessage = {}; 
        buscadorService
          .getSearchQData(string)
          .then(response => {
              console.log("Respuesta", response.data);
              if((response.status_info.status === 200) && (response.data.length > 0)) {
                    console.log("datos nuevos", response.data);
                    const newDatos = response.data.map(i => { 
                        let item = i._source;
                        console.log("item", (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "???")
                        return {
                            id: 1,
                            fecha: item.fecha_documento,
                            asunto: item.analisis_caso_concreto,
                            salaOSeccion: item.sala_seccion,
                            nombreDecision: `Sentencia ${item.radicado_documento}`,
                            delito: item.delito[0].nombre,
                            departamento: item.departamento[0].nombre,
                            municipio: "",
                            anioHechos: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "???",
                            organo: "Lorem ipsum",
                            tipo: "Lorem ipsum",
                            radicado: "Lorem ipsum",
                            procedimiento:  (item.procedimiento.length > 0) ? item.procedimiento[0].nombre : "???",
                            expediente: "Lorem ipsum dolor",
                            extractoBusqueda: item.sintesis,
                            magistrado: "Lily Andrea Rueda Guzmán",
                            actor: "Lorem ipsum dolor sit amet",
                            tipoSujeto: "Lorem ipsum dolor sit amet",
                            accionadoVinculado: "Lorem ipsum dolor sit amet",
                        }
                  });
                  setDatos(newDatos);
                  newMessage["message"] = `Success: ${response.status_info.status}. ${response.status_info.reason}`;
                  newMessage["classname"] = 'success';
              } else {
                  newMessage["message"] = `Error: ${response.status_info.status}. ${response.status_info.reason}`;
                  newMessage["classname"] = 'error';
              }
              handleOpenModal();
              setTimeout(function(){ 
                  handleCloseModal();
                  setMessage(newMessage);
              }, 3000);
              setTimeout(() => {
                  setMessage({ message: "", classname: "" }); 
              }, 6000);
          }
        )
        .catch(error => { 
            newMessage["message"] = `Error: ${error}`;
            newMessage["classname"] = 'error';
            setMessage(newMessage);
        });
  };

  useEffect(() => {
    if(stringQuery !== ""){
      getResultadosBuscadorAI(stringQuery);
    } else {
      setStringQuery(stringParam);
    }
  }, [stringQuery]);

  useEffect(() => {
    if(message.message !== "" ){
      console.log("Message...", message);
      setTimeout(() => {
        setMessage({ message: "", classname: "" });
      }, 10000);
    } 
  }, [message]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
          <p></p>
          {(message.message !== "") ? (
                <Alert variant="outlined" severity={message.classname}>
                    {message.message}
                </Alert>
          ): '' }
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
          <ListCardSearch datosBusqueda={datos} selectedFilters={selectedFilters}></ListCardSearch>
        </Grid>
      </Grid>
      {/*<ProcessingDataModal openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>*/}
    </Container>
  );
}
