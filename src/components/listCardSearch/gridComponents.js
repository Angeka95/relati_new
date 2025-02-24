import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

 // Grids personalizadas

 const SpaceGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        width: "100%",
        margin: '20px 0px 0px 0px',
    },
}));

const WrapGrid = styled(Grid)(({ theme, isListSmall }) => ({

    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        width: "100%",
        margin: '20px 0px 0px 0px',
    },
    [theme.breakpoints.up('sm')]: {
        margin: '0px 0px',
        display: isListSmall?'flex': '',
        flexWrap: isListSmall?'wrap': '',
    },
}));

const SpaceBetweenGrid = styled(Grid)(({ theme, isListSmall }) => ({

    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        width: "100%",
        textAlign: 'center',
        margin: '20px 0px 0px 0px',
    },
    [theme.breakpoints.up('sm')]: {
        margin: '0px 0px',
        display: 'flex',
        flexWrap: isListSmall ? 'wrap' : '',
        width: isListSmall ? "100%" : '',

    },
}));


const Width100Grid = styled(Grid)(({ theme, isListSmall }) => ({

    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {

        width: isListSmall?'100%': '',

    }
}));

const NoneGrid = styled(Grid)(({ theme, isListSmall }) => ({

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: isListSmall ? 'none' : '',
    }
}));

const  JustMapGrid = styled(Grid)(({ theme, isListSmall }) => ({

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: isListSmall ? 'flex' : 'none',
       
    }
}));

const  JustMapNoneGrid = styled(Grid)(({ theme, isListSmall }) => ({

    [theme.breakpoints.up('xs')]: {
        display: isListSmall ? 'none' : '',
    }
}));

export { SpaceGrid, WrapGrid, SpaceBetweenGrid, Width100Grid, NoneGrid, JustMapGrid, JustMapNoneGrid };