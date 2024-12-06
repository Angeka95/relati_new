import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchResults() {

  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stringQuery, setStringQuery] = useState("");

  const [searchParams] = useSearchParams();

  const stringParam = decodeURIComponent(searchParams.get('string'));

  useEffect(() => {
    if(stringQuery !== ""){
      console.log("String query es...", stringQuery); 
    } else {
      setStringQuery(stringParam);
    }
  }, [stringQuery]);

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
