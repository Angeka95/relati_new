import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Context from '../../context/context';
import FilterContext from '../../context/filterContext.js';
import { Card, CardContent, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { JustFilterFloatNoneGrid } from '../../components/styledGridComponents/CustomGrids.js'; 
import { validarfiltroJurisprudencial, setLocalStorageSimple } from '../../helpers/utils.js';
import SelectField from '../../components/resultadosBusqueda/selectField.js';
import '../../App.css';
import { StarSharp } from '@mui/icons-material';

const Filter = ({ arrayProvidencias = [], customFilter = {}, selectedTerm = "", isFilterFloat = false, isShowingFilter = false, isSearchAdvance = false, isVTD = false, href }) => {

  const isFilterDisabled = false;
  
  // En caso de que reciba variables por URL 
  const [searchParams] = useSearchParams();
  
  // Variables de contexto
  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { searchFilterObj, setSearchFilterObj } = useContext(Context);
  const { setSelectedFilters, stringTerm, setStringTerm, createSelectedFiltersObj } = useContext(FilterContext);
  
  // Salas
  const [selectedDataFilter1, setSelectedDataFilter1] = useState([]);
  
  // Anios
  const [selectedDataFilter2, setSelectedDataFilter2] = useState([]);
  
  // Departamentos
  const [selectedDataFilter3, setSelectedDataFilter3] = useState([]);
  
  // Delitos
  const [selectedDataFilter4, setSelectedDataFilter4] = useState([]);
  
  // Macrocasos
  const [selectedDataFilter5, setSelectedDataFilter5] = useState([]);
  
  // Comparecientes
  const [selectedDataFilter6, setSelectedDataFilter6] = useState([]);
  
  // Procedimientos
  const [selectedDataFilter7, setSelectedDataFilter7] = useState([]);
    
  // Funcionalidad de expansion y contraccion de filtros
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const toggleButton = () => { setIsButtonEnabled(prev => !prev) };
  
  // Funcionalidad que permite aplicar los filtros seleccionados
  const applyFilters = () => {
      
      // Modifica el estado de selectedFilters con los valores seleccionados en los filtros
      setSelectedFilters(
        [
          ...selectedDataFilter1, //Salas
          ...selectedDataFilter2, //Anios
          ...selectedDataFilter3, //Departamentos
          ...selectedDataFilter4, //Delitos
          ...selectedDataFilter5, //Macrocasos
          ...selectedDataFilter6, //Comparecientes
          ...selectedDataFilter7, //Procedimientos
        ]
      );
      
      // Actualiza el filtroJurisprudencial con los valores seleccionados
      
      const objFiltroJurisprudencial = {
        salas: [...selectedDataFilter1],
        anios: [...selectedDataFilter2],
        departamentos: [...selectedDataFilter3],
        delitos: [...selectedDataFilter4],
        macrocasos: [...selectedDataFilter5],
        comparecientes: [...selectedDataFilter6],
        procedimientos: [...selectedDataFilter7]
      };
      
      setFiltroJurisprudencial(objFiltroJurisprudencial);
      
      // Cuando ya se tiene la informacion de los filtros se preparan los parametros de busqueda procesar por POST
      const objSearchFilterQry = createSelectedFiltersObj(objFiltroJurisprudencial, stringTerm, arrayProvidencias);
      setLocalStorageSimple('searchFilterQry', JSON.stringify(objSearchFilterQry));
      setLocalStorageSimple('flagFromFilter', "true");
      setSearchFilterObj(objSearchFilterQry);
  };
    
  // Funcionalidad para deshacer la busqueda en Ver Todas Decisiones
  const deshacerBusqueda = (e) => {
    const params = new URLSearchParams({ string: encodeURIComponent(selectedTerm), page: encodeURIComponent(1), per_page: encodeURIComponent(10) });
    window.location.href = `${href}?${params.toString()}`;
  }
  
  // Funcionalidad para deshacer la busqueda en Ver Todas Decisiones
  const deshacerBusquedaVTD = (e) => {
    window.location.href = `/ver-todas-las-decisiones`;
  }
  
  // useEffect que toma el valor del termino de busqueda de la consulta y lo almacena en el contexto stringTerm
  // No se aplica para busquedas avanzadas
   useEffect(() => {
     const searchParamsObj = Object.fromEntries(searchParams.entries());
     if( (stringTerm === "") && searchParamsObj.hasOwnProperty('string')) {
      setStringTerm(decodeURIComponent(searchParams.get('string')));
     }
  }, [stringTerm]);
  
  return (
     <>
      <Card className={isFilterFloat ? (!isShowingFilter ? "card_filter_float_hidden" : "card_filter_float") : "card_filter"} >
        <CardContent>
            <JustFilterFloatNoneGrid isFilterFloat={isFilterFloat} isSearchAdvance={isSearchAdvance}>
              <div className="vertical_align">
                <h3> <FilterListIcon /> Filtrar </h3>
              </div>
            </JustFilterFloatNoneGrid>
            {/* Seccion de filtros principales */}
            {/* Filtro Salas */}
            {(customFilter["salas"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["salas"]} selectedData={selectedDataFilter1} setSelectedData={setSelectedDataFilter1}
              label='Sala o Sección' id='sala'></SelectField>
            )}
            {/* Filtro Años */}
            {(customFilter["anios"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["anios"]} selectedData={selectedDataFilter2} setSelectedData={setSelectedDataFilter2}
              label='Año de la providencia' id='anio'></SelectField>
            )}
            {/* Filtro Departamentos */}
            {(customFilter["departamentos"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["departamentos"]} selectedData={selectedDataFilter3} setSelectedData={setSelectedDataFilter3}
              label='Departamento' id='departamento'></SelectField>
            )}
            {/* Filtro Delitos */}
            {(customFilter["delitos"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["delitos"]} selectedData={selectedDataFilter4} setSelectedData={setSelectedDataFilter4}
              label='Delito' id='delito'></SelectField>
            )} 
            {/* Seccion de filtros principales */}
            {/* Seccion de filtros secundarios */}
            <div className='justify_center'>
               {/* Si el boton de ver más filtros está expandido, muestra filtros secundarios */}
              {(!isButtonEnabled) ?
                  <div className="width_100 text_center">
                    {/* Filtro Macrocasos */}
                    {(customFilter["macrocasos"].length > 0) && (
                    <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["macrocasos"]} selectedData={selectedDataFilter5} setSelectedData={setSelectedDataFilter5}
                        label='Macrocasos' id='macrocasos'></SelectField>
                    )} 
                    {/* Filtro Comparecientes */}
                    {(customFilter["comparecientes"].length > 0) && (
                    <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["comparecientes"]} selectedData={selectedDataFilter6} setSelectedData={setSelectedDataFilter6}
                        label='Compareciente' id='compareciente'></SelectField>
                    )}
                    {/* Filtro Procedimientos */}
                    {(customFilter["procedimientos"].length > 0) && (
                    <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["procedimientos"]} selectedData={selectedDataFilter7} setSelectedData={setSelectedDataFilter7}
                        label='Procedimiento' id='procedimiento'></SelectField>
                    )}
                    {/* Botón para ocultar filtros secundarios */}
                    <Button
                      className="link_primary text_lowercase"
                      onClick={toggleButton}>
                      {!isButtonEnabled && 'ver menos filtros'}
                    </Button>
                  </div>
                :
                  <>
                    {/* Botón para mostrar filtros secundarios */}
                    <Button className="link_primary text_lowercase" onClick={toggleButton}> ver más filtros</Button>
                  </>
              }
            </div>
            {/* Seccion de filtros secundarios */}
            {/* Seccion de aplicar filtros y reestablecer resultados */}
            <div className="justify_center width_100 margin_top_s">
              {/* Boton para aplicar filtros */}
              <Button disabled={isFilterDisabled} className="button_primary margin_xs " onClick={applyFilters}>Aplicar filtros</Button>
            </div>
            {/* Boton para reestablecer resultados, si isVTD(ver todas decisiones) es verdadero, la funcionalidad es diferente */}
            {(isVTD === true) && (
                <div className="justify_center width_100 margin_top_m">
                  <Button variant="outlined" className='autocomplete_bar_inner_search_undo_results margin_right_0' size="small" onClick={deshacerBusquedaVTD}>Reestablecer resultados</Button>
                </div>
            )}
            {(isVTD === false) && (
                <>
                  {((!validarfiltroJurisprudencial(filtroJurisprudencial))) && (  
                  <div className="justify_center width_100 margin_top_m">
                    <Button variant="outlined" className='autocomplete_bar_inner_search_undo_results margin_right_0' size="small" onClick={deshacerBusqueda}>Reestablecer resultados</Button>
                  </div>
                  )}
                </>
            )}
            {/* Seccion de aplicar filtros y reestablecer resultados */}  
        </CardContent>
      </Card>
    </>
  );
  
};

export default Filter;