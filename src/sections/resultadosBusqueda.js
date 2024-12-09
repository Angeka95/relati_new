import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import buscadorService from '../services/buscador.js';

export default function SearchResults() {

  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("");
  const [message, setMessage] = useState({ message: "", classname: "" });

  const [searchParams] = useSearchParams();

  const stringParam = decodeURIComponent(searchParams.get('string'));


  const getResultadosBuscadorAI = (string) => {
        buscadorService
          .getSearchQData(string)
          .then(response => {
              console.log("Respuesta", response.data);
              if((response.status_info.status === 200) && (response.data.length > 0)) {
                  setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`);
              } else {
                  setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
              }
          }
        )
        .catch(error => { 
          setMessage(`Error: ${error}`);
        });
  };

  useEffect(() => {
    if(stringQuery !== ""){
      console.log("String query es...", stringQuery); 
      getResultadosBuscadorAI(stringQuery);
    } else {
      setStringQuery(stringParam);
    }
  }, [stringQuery]);

  useEffect(() => {
    if(message !== ""){
      console.log("Message...", message);
      setTimeout(() => {
        setMessage("");
      }, 10000);
    } 
  }, [message]);

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
          <ListCardSearch selectedFilters={selectedFilters}></ListCardSearch>
        </Grid>
      </Grid>

    </Container>
  );
}
