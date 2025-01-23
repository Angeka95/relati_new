import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

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
        margin: '20px 5px 60px 5px',
    },


}));

export { SmallResultsGrid, WrapMapGrid, MapGrid };