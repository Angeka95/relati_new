import SearchBarSmall from '../components/searchBarSmall.js';
import Filter from '../components/filter.js';
import FilterLarge from '../components/filterLarge.js';
import ListCardSearch from '../components/listCardSearchResults.js';
import '../App.css';
import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';


export default function Map() {

    const SmallResultsGrid = styled(Grid)(({ theme }) => ({

        [theme.breakpoints.up('sm')]: {
            margin: '60px',
         
        },

        [theme.breakpoints.down('sm')]: {
            padding: '20px',
           
        }
    }));


    const  WrapMapGrid= styled(Grid)(({ theme }) => ({

        [theme.breakpoints.up('sm')]: {
            display:  'flex' ,
            flexWrap: 'nowrap',
        },
        [theme.breakpoints.down('sm')]: {
            display:  'flex' ,
            flexWrap: 'wrap',
        },

    }));

    const MapGrid = styled(Grid)(({ theme }) => ({
        
        [theme.breakpoints.up('sm')]: {
            margin: '60px 60px 60px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '20px',
        },


    }));
    
  return (
    <div> 
    <Container className="container_large">
    <FilterLarge> </FilterLarge>
    <WrapMapGrid container spacing={0} >
        <SmallResultsGrid item xs={12} sm={12} md={5} lg={5} xl={5}  >

            <ListCardSearch 
                  isListSmall={true}
            
            > </ListCardSearch> 

        </SmallResultsGrid > 

        <MapGrid item xs={12} sm={12} md={7} lg={7} xl={7} >
            
        <div className="map light_blue"></div>
            
        </MapGrid> 
    </WrapMapGrid> 
    </Container>
    
    </div>
 
  );
}
