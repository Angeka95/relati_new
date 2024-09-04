import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Switch, FormControlLabel, Container, Grid } from '@mui/material';
import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import Context from '../context/context';

export default function Search({isSearchAdvance}) {

  // Grids personalizadas

  const NoneGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
      display: 'none',
      padding: 'none',
    }
  }));


  const ShowGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
      display: 'inblock',
    },

    [theme.breakpoints.up('sm')]: {
      display: 'none',
      padding: 'none',
    }
  }));

  const SpaceBottom = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
    }
  }));

  // valor en el buscador 

  const [valueBar, setValueBar] = useState(searchOptions[0].title);

    // Trae el valor de la busqueda y del switch desde el contexto 

  const { verTodasDecisiones, setVerTodasDecisiones, setBusqueda } = useContext(Context);
  const updateSelectedValue = (event, value) => {
    setValueBar(value);
  };

      // Busqueda por palabra

  const search = () => {
    setBusqueda(valueBar);
    setVerTodasDecisiones(false)
  };


    // Encender y apagar switch ver todas las decisiones 

  const handleChange = () => {
    setVerTodasDecisiones(prev => !prev);
    setValueBar('');
    if (!verTodasDecisiones) {
      setBusqueda('');
    }
  };

  return (




    <div >
      <Stack className="autocomplete_bar_search">
        
        <SpaceBottom>

          {!isSearchAdvance && (
                      <FormControlLabel control={<Switch checked={verTodasDecisiones} onChange={handleChange} />} label="ver todas las decisiones" className="switch_search" />)
          }


          <Autocomplete className="margin_top_s autoconmplete_container"
            id="free-solo-demo"
            value={valueBar}
            freeSolo
            onChange={updateSelectedValue}
            options={searchOptions.map((option) => option.title)}
            renderInput={(params) => <TextField {...params} label="Ingrese su búsqueda" placeholder="Busque por palabra clave, número de decisión, radicado...  " inputProps={{
              ...params.inputProps,
              maxLength: 80
            }} />}

          />
          {/* <div className="autocomplete_delete">
          <ClearIcon />
        </div> */}
          <NoneGrid>
            <Button onClick={search} className="autocomplete_button button_primary" startIcon={<SearchIcon />}>
              Buscar
            </Button>
          </NoneGrid>
          <ShowGrid>
            <Button onClick={search} className="autocomplete_button_responsive button_primary"><SearchIcon /></Button>

          </ShowGrid>

          {!isSearchAdvance && (
          <NoneGrid>
            <Button className="light_white text_blue autocomplete_button_help button_terciary">?</Button>
          </NoneGrid>
          )}
          {!isSearchAdvance && (
          <Button className="autocomplete_button_advance primary_blue text_white button_secondary_border">Búsqueda Avanzada</Button>
          )}
        </SpaceBottom>
      </Stack>
    </div>

  );
}


const searchOptions = [
  { title: 'Competencia de la JEP' },
  { title: 'Competencia y Jurisdicción' },
  { title: 'Competencia de la Jurisdicción Ordinaria' },
  { title: 'Competencia Temporal de la JEP' },
  { title: 'Requisitos de la competencia' },
  { title: 'Competencia de las Salas de Justicia' },

];