import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Context from '../context/context';
import { Card, CardContent, Button, Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { JustFilterFloatNoneGrid } from '../components/styledGridComponents/CustomGrids.js'; 
import { validarfiltroJurisprudencial, validateSearchParamsVTD, createSelectedFiltersVTD } from '../helpers/utils.js';
import SelectField from '../components/selectFieldBeta.js';
import '../App.css';

const FilterBeta = ({ setSelectedFilters, customFilter = {}, isFilterFloat = false, isShowingFilter = false, isSearchAdvance = false, isVTD = false, handlerReset = false}) => {

  // Manipula el valor de busqueda que viene desde SearchBarForInnerResults y en valor
  const searchBarForInnerResultsInputRef = useRef(null);
  const [searchParams] = useSearchParams();

  const [isFilterDisabled, setIsFilterDisabled] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [ listaDptosJurisprudencial, setListaDptosJurisprudencial ] = useState([]);
  const [selectedDataFilter1, setSelectedDataFilter1] = useState([]);
  const [selectedDataFilter2, setSelectedDataFilter2] = useState([]);
  const [selectedDataFilter3, setSelectedDataFilter3] = useState([]);
  const [selectedDataFilter4, setSelectedDataFilter4] = useState([]); 
  const [selectedDataFilter5, setSelectedDataFilter5] = useState([]);
  const [selectedDataFilter6, setSelectedDataFilter6] = useState([]);
  const [selectedDataFilter7, setSelectedDataFilter7] = useState([]);
  const [datos_delito, setDatosDelito] = useState([]);
  const [datos_compareciente, setDatosCompareciente] = useState([]);
  const [datos_procedimiento, setDatosProcedimiento] = useState([]);
  
  const { verTodasDecisiones, busqueda } = useContext(Context);
  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const { filtroJurisprudencialVTD, setFiltroJurisprudencialVTD } = useContext(Context);
  
  const toggleButton = () => {
    setIsButtonEnabled(prev => !prev);
  };
    
    useEffect(() => {
      const searchParamsObj = Object.fromEntries(searchParams.entries());
    
      if(!validarfiltroJurisprudencial(filtroJurisprudencial)) { 

        //console.log("datos en filter 3", selectedDataFilter3);
        let updateSelectedFilters = [...new Set([
            ...selectedDataFilter1,
            ...selectedDataFilter2,
            ...selectedDataFilter3,
            ...selectedDataFilter4,
            ...selectedDataFilter5,
            ...selectedDataFilter6,
            ...selectedDataFilter7,
          ].concat([...filtroJurisprudencial.departamentos]))];
        if(filtroJurisprudencial.departamentos.length === 1){
          updateSelectedFilters = [...new Set([
            ...selectedDataFilter1,
            ...selectedDataFilter2,
            ...selectedDataFilter4,
            ...selectedDataFilter5,
            ...selectedDataFilter6,
            ...selectedDataFilter7,
          ].concat([...filtroJurisprudencial.departamentos]))];
        } 
        //console.log("updateselectedfilters", updateSelectedFilters);
        setSelectedFilters(updateSelectedFilters);
      } else if (validateSearchParamsVTD(searchParamsObj)) {
          const newSelectedFilters = createSelectedFiltersVTD(searchParamsObj);
          //console.log("Verificando los filtros seleccionados", newSelectedFilters);
          setSelectedDataFilter1(newSelectedFilters["salas"]);
          setSelectedDataFilter2(newSelectedFilters["anios"]);
          setSelectedDataFilter3(newSelectedFilters["departamentos"]);
          setSelectedDataFilter4(newSelectedFilters["delitos"]);
          setSelectedDataFilter5(newSelectedFilters["macrocasos"]);
          setSelectedDataFilter6(newSelectedFilters["comparecientes"]);
          setSelectedDataFilter7(newSelectedFilters["procedimientos"]);
      } else {
          //console.log("Los componentes por cada criterio de filtrado quedan vacios");
          setSelectedDataFilter1([]);
          setSelectedDataFilter2([]);
          setSelectedDataFilter3([]);
          setSelectedDataFilter4([]);
          setSelectedDataFilter5([]);
          setSelectedDataFilter6([]);
          setSelectedDataFilter7([]);
      }
    }, [filtroJurisprudencial]);
  
   // applyFilters es la función que se ejecuta al hacer clic en el botón "Aplicar filtros"
  // Se encarga de aplicar los filtros seleccionados y actualizar el estado de selectedFilters
  const applyFilters = () => {
    if(isVTD === true){ 
      console.log("filtroJurisprudencialVTD", filtroJurisprudencialVTD);
      setFiltroJurisprudencial(filtroJurisprudencialVTD);
    } else {
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
      setFiltroJurisprudencial({
        salas: [...selectedDataFilter1],
        anios: [...selectedDataFilter2],
        departamentos: [...selectedDataFilter3],
        delitos: [...selectedDataFilter4],
        macrocasos: [...selectedDataFilter5],
        comparecientes: [...selectedDataFilter6],
        procedimientos: [...selectedDataFilter7]
      });
    }    
  };
  
  useEffect(() => {
      if (!verTodasDecisiones && !busqueda) {
        setIsFilterDisabled(true);
        // setSelectedDataAllFilters([])
      }
      else {
        setIsFilterDisabled(false);
      }
  
    }, [verTodasDecisiones, busqueda]);
    
  useEffect(() => {  
    if (customFilter !== null ) {
      setListaDptosJurisprudencial(customFilter["departamentos"]);    
    }
    }, [customFilter]);
    
    
   // deshacerBusquedaVTD reestablece la busqueda y redirecciona a ver todas las decisiones
   const deshacerBusquedaVTD = (e) => {
    window.location.href = `/ver-todas-las-decisiones`;
  }
    
  return (
     <>
     <Card className={isFilterFloat ? (!isShowingFilter ? "card_filter_float_hidden" : "card_filter_float") : "card_filter"} >
      <CardContent>
        <JustFilterFloatNoneGrid isFilterFloat={isFilterFloat} isSearchAdvance={isSearchAdvance}>
          <div className="vertical_align">
            <h3> <FilterListIcon /> Filtrar </h3>
          </div>
        </JustFilterFloatNoneGrid>
        {(customFilter["salas"].length > 0) && (
        <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["salas"]} selectedData={selectedDataFilter1} setSelectedData={setSelectedDataFilter1}
          label='Sala o Sección' id='sala' isVTD={isVTD}></SelectField>
        )}
        {(customFilter["anios"].length > 0) && (
        <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["anios"]} selectedData={selectedDataFilter2} setSelectedData={setSelectedDataFilter2}
          label='Año de la providencia' id='anio' isVTD={isVTD}></SelectField>
        )}
        {(customFilter["departamentos"].length > 0) && (
        <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["departamentos"]} selectedData={selectedDataFilter3} setSelectedData={setSelectedDataFilter3}
          label='Departamento' id='departamento'  isVTD={isVTD}></SelectField>
        )}
        {(customFilter["delitos"].length > 0) && (
        <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["delitos"]} selectedData={selectedDataFilter4} setSelectedData={setSelectedDataFilter4}
          label='Delito' id='delito'  isVTD={isVTD}></SelectField>
        )}  
        <div className='justify_center'>
          {isButtonEnabled && (
            <Button className="link_primary text_lowercase" onClick={toggleButton}> ver más filtros
            </Button>)
          }
          {!isButtonEnabled && (
            <div className="width_100 text_center">
            {(customFilter["macrocasos"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["macrocasos"]} selectedData={selectedDataFilter5} setSelectedData={setSelectedDataFilter5}
                label='Macrocasos' id='macrocasos' isVTD={isVTD}></SelectField>
            )} 
              
            {(customFilter["comparecientes"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["comparecientes"]} selectedData={selectedDataFilter6} setSelectedData={setSelectedDataFilter6}
                label='Compareciente' id='compareciente' isVTD={isVTD}></SelectField>
            )}
              
            {(customFilter["procedimientos"].length > 0) && (
            <SelectField isDisabled={isFilterDisabled} datos_filtros={customFilter["procedimientos"]} selectedData={selectedDataFilter7} setSelectedData={setSelectedDataFilter7}
                label='Procedimiento' id='procedimiento' isVTD={isVTD}></SelectField>
            )}
              <Button
                className="link_primary text_lowercase"
                onClick={toggleButton}>
                {!isButtonEnabled && 'ver menos filtros'}
              </Button>
            </div>
          )
          }
        </div>
        <div className="justify_center width_100 margin_top_s">
          <Button disabled={isFilterDisabled} className="button_primary margin_xs " onClick={applyFilters}>Aplicar filtros</Button>
        </div>
        {(isVTD === true) ?
            <div className="justify_center width_100 margin_top_m">
              <Button variant="outlined" className='autocomplete_bar_inner_search_undo_results margin_right_0' size="small" onClick={deshacerBusquedaVTD}>Reestablecer resultados</Button>
            </div>
            :
            <>
              {((typeof handlerReset === "function") && (!validarfiltroJurisprudencial(filtroJurisprudencial))) && (
              <div className="justify_center width_100 margin_top_m">
                <Button variant="outlined" className='autocomplete_bar_inner_search_undo_results margin_right_0' size="small" onClick={() => handlerReset() }>Reestablecer resultados</Button>
              </div>
              )}
            </>
        }
      </CardContent>
    </Card>
    </>
  );
  
};

export default FilterBeta;