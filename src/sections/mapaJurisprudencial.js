import SearchBarSmall from '../components/searchBarSmall.js';
import Filter from '../components/filter.js';
import FilterLarge from '../components/filterLarge.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';


export default function Map() {

    
  return (
    <div> 
    <FilterLarge> </FilterLarge>
    <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >

            <ListCardSearch > </ListCardSearch> 

        </Grid> 

        <Grid item xs={12} sm={12} md={4} lg={8} xl={8} >

        </Grid> 
    </Grid> 
    
    </div>
 
  );
}
