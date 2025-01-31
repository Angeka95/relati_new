import React, { useState, useEffect, useContext, useRef } from 'react';
import Context from '../context/context';
import { Button, Switch, FormControlLabel, Grid, Alert, TextField, Stack, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import '../App.css'

export default function Search({ isSearchAdvance, isSearchMain }) {

  // referencia para poder acceder al valor escrito en el buscador
  const inputRef = useRef(null);

  // valor en el buscador 
  const [valueBar, setValueBar] = useState('');
  const [messageSearch, setMessageSearch] = useState({ message: "", classname: "" });

  // Trae el valor de la busqueda y del switch desde el contexto 

  const { verTodasDecisiones, setVerTodasDecisiones, setBusqueda } = useContext(Context);
  
  const updateSelectedValue = (event, value) => {
    setValueBar(event.target.value);
  };

  // Busqueda por palabra

  const search = () => {

    let message_ = { message: "", classname: "" };
    let searchValue = inputRef.current.querySelector('input').value;
    
    if(searchValue.length === 0){
      message_ = { message: "Busque por palabra clave, número de decisión, radicado...", classname: "warning" };
      setTimeout(function(){ 
          setMessageSearch(message_);
      }, 300);
      setTimeout(() => {
          setMessageSearch({ message: "", classname: "" }); 
      }, 1500);
    } else {
      const params = new URLSearchParams({ string: encodeURIComponent(searchValue) });
      window.location.href = `/resultados-busqueda?${params.toString()}`;
    }

  };

  useEffect(() => {

          const formAutocomplete = document.querySelector('.autocomplete_search');
          const inputAutocomplete = formAutocomplete.querySelector('input');
          const buttonAutocomplete = formAutocomplete.querySelectorAll('button.searchAIButton')[0];
          
          if(inputAutocomplete){
            inputAutocomplete.focus();
          }
          
          if(buttonAutocomplete){
          
              document.addEventListener("keydown", function(event) {
                  if (event.key === "Enter") { 
                  
                    let message_ = { message: "", classname: "" };
                    let searchValue = valueBar;
                    
                    if(searchValue.length === 0){
                      message_ = { message: "Busque por palabra clave, número de decisión, radicado...", classname: "warning" };
                      setTimeout(function(){ 
                          setMessageSearch(message_);
                      }, 300);
                      setTimeout(() => {
                          setMessageSearch({ message: "", classname: "" }); 
                      }, 1500);
                    } else {
                      const params = new URLSearchParams({ string: encodeURIComponent(searchValue) });
                      window.location.href = `/resultados-busqueda?${params.toString()}`;
                    }
                    
                  }  
              });
              
          }  
          
  },[valueBar]);
 

  // Encender y apagar switch ver todas las decisiones 

  const handleChange = () => {
    setVerTodasDecisiones(prev => !prev);
    setValueBar('');
    if (!verTodasDecisiones) {
      setBusqueda('');
    }
  };

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

  return (
    <>
    <div className="justify_center">
      <Stack className={isSearchAdvance ? ('autocomplete_bar_search_nomargin') : 'autocomplete_bar_search'} >
        <SpaceBottom>
          {(isSearchMain || !isSearchAdvance) && (
            <FormControlLabel control={<Switch checked={verTodasDecisiones} onChange={handleChange} />} label="ver todas las decisiones" className="switch_search" />)
          }
          <div className="autocomplete_search">
            <Autocomplete style={{ color: 'black' }} className="autocomplete_search_field margin_top_s z-index_front text_black"
              id="free-solo-demo"
              freeSolo
              value={valueBar}
              onChange={updateSelectedValue}
              options={searchOptions.map((option) => option.title)}
              renderInput={(params) => <TextField ref={inputRef} {...params} placeholder="Busque por palabra clave, número de decisión, radicado...  " 
              inputProps={{
                ...params.inputProps,
                maxLength: 80
              }} />}
            />
            <NoneGrid>
              <Button onClick={search} className="searchAIButton autocomplete_button button_primary z-index100" startIcon={<SearchIcon />}>
                Buscar
              </Button>
            </NoneGrid>
            <ShowGrid>
              <Button onClick={search} className="searchAIButton autocomplete_button_responsive button_primary"><SearchIcon /></Button>
            </ShowGrid>
          </div>
        </SpaceBottom>
        {(messageSearch.message.trim() !== '') && 
            <Alert variant="outlined" severity={messageSearch.classname} className='margin_top_m'>
                {messageSearch.message}
            </Alert>
        }
      </Stack>
    </div>
    </>
  );
}

const searchOptions = [];