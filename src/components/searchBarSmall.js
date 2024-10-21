import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Switch, FormControlLabel, Container } from '@mui/material';
import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';



export default function search() {
  return (

    <Stack className='autocomplete_bar_search_small this_is_a_test'>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={searchOptions.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="Buscar en los resultados" inputProps={{
          ...params.inputProps,
          maxLength: 80
        }} />}

      />
      {/* <div className="autocomplete_delete_small">
          <ClearIcon />
        </div> */}

      <Button className="autocomplete_button_small button_primary"><SearchIcon /></Button>

    </Stack>

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