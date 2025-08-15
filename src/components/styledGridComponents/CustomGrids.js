import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// Grids personalizadas

export const NoneGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
      display: 'none',
      padding: 'none',
    }
}));


export const ShowGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
      display: 'inblock',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      padding: 'none',
    }

}));

export const SpaceBottom = styled(Grid)(({ theme }) => ({
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: '40px',
  },

}));
 
export const JustFilterFloatNoneGrid = styled( Grid, { shouldForwardProp: (prop) => prop !== 'isFilterFloat' && prop !== 'isSearchAdvance' }
      )(({ theme, isFilterFloat, isSearchAdvance }) => ({
        
        [theme.breakpoints.up('xs')]: {
          display: isFilterFloat || isSearchAdvance ? 'none' : 'block',
        }
      
}));

