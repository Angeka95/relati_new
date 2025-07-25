import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import Context from '../context/context';
import { getLocalStorageWithExpiry } from '../helpers/utils.js';
import { Button, Switch, FormControlLabel, Alert, TextField, Stack, Autocomplete } from '@mui/material';
import { ShowGrid, NoneGrid, SpaceBottom } from '../components/styledGridComponents/CustomGrids.js'; 
import SearchIcon from '@mui/icons-material/Search';
import buscadorService from '../services/buscador.js';
import '../App.css'

export default function Search({ isSearchAdvance = true, isSearchMain }) {

  // valor en el buscador 
  const inputRef = useRef(null);
  const [valueBar, setValueBar] = useState(null);
  const [valAutoComplete, setValAutoComplete] = useState('');
  const [options, setOptions] = useState([]);
  const [messageSearch, setMessageSearch] = useState({ message: "", classname: "" });
  
  // Captura el valor en el componente Autocomplete
  const updateSelectedValue = (event, value) => {
      setValueBar(value);
  };
    
  // Esta funcion adjunta al onChange de TextField permite obtener lista de opciones que el usuario pueda elegir
  const updateValAutoComplete = (event, value) => {
      setValAutoComplete(value);
  };
  
  // Trae el valor de la busqueda y del switch desde el contexto 

  const { estadoVerTodasDecisiones, setEstadoVerTodasDecisiones } = useContext(Context);
    
  // Busqueda por palabra
  
  const handleSearch = () => {

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
      const params = new URLSearchParams({ string: encodeURIComponent(searchValue), page: 1, per_page: 10 });
      window.location.href = `/resultados-busqueda?${params.toString()}`;
    }

  };
  
  // Al presionar tecla Enter en el buscador, se ejecuta la busqueda
  
  const keypressEnterResultadosBusqueda = (event) => {
        if (event.key === "Enter") {    
            handleSearch();
        } 
    };
    
  useEffect(() => {
    
  },[]);
  
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
  
  // Encender y apagar switch ver todas las decisiones 

  const handleChange = () => {
    setEstadoVerTodasDecisiones(prev => !prev);
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

  return (
    <>
    <div className="justify_center">
      <Stack className={isSearchAdvance ? ('autocomplete_bar_search_nomargin') : 'autocomplete_bar_search'} >
        <SpaceBottom>
          {/*(isSearchMain || !isSearchAdvance) && (*/
            <FormControlLabel control={<Switch checked={estadoVerTodasDecisiones} onChange={handleChange} />} label="ver todas las decisiones" className="switch_search" />/*)*/
          }
          <div className="autocomplete_search">
            <Autocomplete className="autocomplete_search_field margin_top_s"
              id="autocomplete-search-inner"
              freeSolo
              value={valueBar}
              onChange={updateSelectedValue}
              onInputChange={updateValAutoComplete}
              onKeyDown={keypressEnterResultadosBusqueda}
              options={options.map((option) => option.title)}
              renderInput={(params) => 
                  <TextField ref={inputRef} {...params} placeholder="Busque por palabras clave, número de decisión, radicado...  " inputProps={{
                  ...params.inputProps,
                  maxLength: 400
                  }} 
                  />
              }
            />
            <NoneGrid>
              <Button onClick={handleSearch} className="searchAIButton autocomplete_button button_primary z-index_front" startIcon={<SearchIcon />}>
                Buscar
              </Button>
            </NoneGrid>
            <ShowGrid>
              <Button onClick={handleSearch} className="searchAIButton autocomplete_button_responsive button_primary z-index_front"><SearchIcon /></Button>
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