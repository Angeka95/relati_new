import React from 'react';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, TextField, Stack, Autocomplete, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const SearchBarForInnerResultsVTD = forwardRef(( props, ref ) => {

  const inputRef = useRef(null); 

  const { handlerInnerSearch, handlerReset } = props;
    
  const options = [];  
  
  const [valueSearchBar, setValueSearchBar] = useState('');
  
  const updateSelectedValue = (e) => {
    setValueSearchBar(e.target.value);
  };
  
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValueSearchBar('')
    },
    getValue: () => {
      return valueSearchBar;
    }
  }));
  
  const keypressEnterResultadosBusqueda = (event) => {
    if (event.key === "Enter") {    
      handlerInnerSearch(valueSearchBar);
    } 
  };
    
  return (
    <div className="autocomplete_bar_inner_search">
      <Stack className='autocomplete_bar_search_small'>
        <Autocomplete
          id="searchBarForInnerResults"
          value={valueSearchBar}
          freeSolo
          options={options.map((option) => option.title)}
          renderInput={(params) => <TextField {...params}
                                      id="searchBarForInnerResultsTextField"
                                      label="Buscar en los resultados"
                                      ref={inputRef}
                                      onKeyDown={keypressEnterResultadosBusqueda}
                                      placeholder=""
                                      inputProps={{
                                            ...params.inputProps,
                                            maxLength: 80
                                      }}
                                      onChange={updateSelectedValue}
                                    />
          }
        />
        <Button className="autocomplete_button_small button_primary z-index_front" onClick={()=>handlerInnerSearch(valueSearchBar)} ><SearchIcon /></Button>
      </Stack>
      <Box>
        <Button variant="outlined" className='autocomplete_bar_inner_search_undo_results' size="small" onClick={() => handlerReset()}>Reestablecer resultados</Button>
      </Box>
    </div>
  ); 
});

export default SearchBarForInnerResultsVTD;