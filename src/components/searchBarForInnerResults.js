import React from 'react';
import { useState, useRef } from 'react';
import { Button, TextField, Stack, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const SearchBarForInnerResults = ({handlerInnerSearch, ref = null }) => {
    
  const options = [];  
  const inputRef = useRef(ref);
  
  const [valueSearchBar, setValueSearchBar] = useState('');
  
  const updateSelectedValue = (e) => {
    setValueSearchBar(e.target.value);
  };
    
  return (
    <Stack className='autocomplete_bar_search_small'>
      <Autocomplete
        id="searchBarForInnerResults"
        value={valueSearchBar}
        freeSolo
        options={options.map((option) => option.title)}
        renderInput={(params) => <TextField {...params}
                                    id="searchBarForInnerResultsTextField"
                                    ref={inputRef}
                                    label="Buscar en los resultados" 
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
  ); 
}

export default SearchBarForInnerResults;