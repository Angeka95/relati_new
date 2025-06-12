import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import Context from '../context/context';
import { getLocalStorageWithExpiry } from '../helpers/utils.js';
import { Button, Switch, FormControlLabel, Grid, Alert, TextField, Stack, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import buscadorService from '../services/buscador.js';
import '../App.css'

export default function Search({ isSearchAdvance, isSearchMain }) {

  // referencia para poder acceder al valor escrito en el buscador
  const inputRef2 = useRef(null);

  // valor en el buscador 
  const [valueBar, setValueBar] = useState('');
  const [messageSearch, setMessageSearch] = useState({ message: "", classname: "" });
  const [valAutoComplete, setValAutoComplete] = useState('');
  const [options, setOptions] = useState([]);
  //const [verTodasDecisiones, setVerTodasDecisiones] = useState(false);

  // Trae el valor de la busqueda y del switch desde el contexto 

  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);
    
  const updateSelectedValue = (event, value) => {
    console.log("valor auotc", event.target.value, value)
    setValueBar(event.target.value);
  };

  // Busqueda por palabra

  const search = () => {

    let message_ = { message: "", classname: "" };
    let searchValue = inputRef2.current.querySelector('input').value;
    
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
  
  const keypressEnterResultadosBusqueda = (event) => {
    if (event.key === "Enter") {    
      search();
    } 
  };
  
  // Encender y apagar switch ver todas las decisiones 

  const handleChange = () => {
    setEstadoVerTodasDecisiones(prev => !prev);
    /*setValueBar('');
    if (!verTodasDecisiones) {
      setBusqueda('');
    }*/
  };
  
  useEffect(()=>{
    if((estadoVerTodasDecisiones === true) && (window.location.pathname !== "/ver-todas-las-decisiones") ){
      window.location.href = `/ver-todas-las-decisiones`;
    } 
    if((estadoVerTodasDecisiones === false) && (window.location.pathname === "/ver-todas-las-decisiones") ){
      const stringQueryLs = getLocalStorageWithExpiry('stringQueryLs');
      const params = new URLSearchParams({ string: encodeURIComponent(stringQueryLs) });
      window.location.href = `/resultados-busqueda?${params.toString()}`;
    }
  },[estadoVerTodasDecisiones]);
  
  const executeAutoComplete = (event) => {
  console.log("fasdfad", event.target.value);
          setValAutoComplete(event.target.value);
      };
      
      const getListaBuscadorAutocompletar = (expresion) => {
          buscadorService
              .getBuscadorListaAutocompletar(expresion)
              .then(response => {
                  let optionsAutocomplete = response.data.map(item => {
                      return { title: item.value };
                  });
                  setOptions(optionsAutocomplete);
               }
              )
              .catch(error => console.log(error));
      }; 
      
      // Este Hook permite actualizar el valor de estado options cada vez que se cambia el valor del input
      useEffect((() => {
          if ((valAutoComplete !== null ) && (valAutoComplete.length >= 3)) {
               setTimeout(() =>{ 
                  getListaBuscadorAutocompletar(valAutoComplete);
               }, 1200);
          }
      }), [valAutoComplete]);

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
          {/*(isSearchMain || !isSearchAdvance) && (*/
            <FormControlLabel control={<Switch checked={estadoVerTodasDecisiones} onChange={handleChange} />} label="ver todas las decisiones" className="switch_search" />/*)*/
          }
          <div className="autocomplete_search">
            <Autocomplete style={{ color: 'black' }} className="autocomplete_search_field margin_top_s z-index_front text_black"
              id="free-solo-demo"
              freeSolo
              value={valueBar}
              onKeyDown={keypressEnterResultadosBusqueda}
              onChange={updateSelectedValue}
              options={options.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} ref={inputRef2}  placeholder="Busque por palabra clave, número de decisión, radicado...  " 
              inputProps={{
                ...params.inputProps,
                maxLength: 80
              }} 
              onChange={executeAutoComplete}
              />}
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
          {!isSearchAdvance && (
            <NoneGrid>
              <Button className="light_white text_blue autocomplete_button_help button_terciary">?</Button>
            </NoneGrid>
          )}
          {isSearchAdvance && (
            <Link to="/busqueda-avanzada"> 
            <Button className="autocomplete_button_advance primary_blue text_white button_secondary_border">Búsqueda Avanzada</Button>
            </Link> 
          )}
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
