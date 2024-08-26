import SearchBar from '../components/searchBar.js';
import Filter from '../components/filter.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';


export default function SearchResults() {
  const [selectedFilters, setSelectedFilters] = useState([]);

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
