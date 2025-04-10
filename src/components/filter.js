import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SelectField from '../components/selectField.js';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import documentoService from '../services/documento.js';
import datos_anios from '../data/data_anios.js';
import { datos_macrocaso } from '../data/datos_macrocaso.js';
import datos_sala_seccion from '../data/datos_sala_seccion.js';
import Context from '../context/context';
import { validarfiltroJurisprudencial, generarArrayDeObjetosNombreCampoValor, validateSearchParamsVTD, createSelectedFiltersVTD } from '../helpers/utils.js';
import mapaJurisprudencialService from '../services/mapa_jurisprudencial.js';

export default function Filter({ setSelectedFilters, isFilterFloat, isShowingFilter, selectedData, isSearchAdvance }) {
  // Estado para controlar si el botón está habilitado o deshabilitado
  const { verTodasDecisiones, busqueda } = useContext(Context);
  const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
  const [ listaDptosJurisprudencial, setListaDptosJurisprudencial ] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [selectedDataFilter1, setSelectedDataFilter1] = useState([]);
  const [selectedDataFilter2, setSelectedDataFilter2] = useState([]);
  const [selectedDataFilter3, setSelectedDataFilter3] = useState([]);
  const [selectedDataFilter4, setSelectedDataFilter4] = useState([]);
  const [selectedDataFilter5, setSelectedDataFilter5] = useState([]);
  const [selectedDataFilter6, setSelectedDataFilter6] = useState([]);
  const [selectedDataFilter7, setSelectedDataFilter7] = useState([]);
  const [selectedDataAllFilters, setSelectedDataAllFilters] = useState([]);
  const [isFilterDisabled, setIsFilterDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [datos_delito, setDatosDelito] = useState([]);
  const [datos_compareciente, setDatosCompareciente] = useState([]);
  const [datos_procedimiento, setDatosProcedimiento] = useState([]);
  
  const [searchParams] = useSearchParams();
  
  //Funcion que hace el llamado para traer la data de departamentos
  const getDepartamentos = () => {
    mapaJurisprudencialService
        .getDepartamentos()
        .then(response => {
            if((response.status_info.status === 200) && (response.data.length > 0)) {
                let newArrayListaDptos = generarArrayDeObjetosNombreCampoValor(response.data, "departamento", "departamento");
                setListaDptosJurisprudencial(newArrayListaDptos);
            } 
        }
        )
        .catch(error => console.log(error));
  };
  
  useEffect(() => {
    if(listaDptosJurisprudencial.length === 0){
        getDepartamentos();
    } 
  }, [listaDptosJurisprudencial]);
  
  useEffect(() => {
    //if(selectedDataFilter3.length === 0){
        setSelectedDataFilter3([...filtroJurisprudencial.departamentos]);
    /*} else {
      setSelectedDataFilter3([]);
    }*/
  }, [filtroJurisprudencial, setSelectedDataFilter3]);

  const getDataFromDocumento = () => {
    documentoService
        .getDetailsDocument()
        .then(response => {
            if((response.status_info.status === 200) && (response.data !== null)) {
              let newArrayDelitos = generarArrayDeObjetosNombreCampoValor(response.data.delitos, "delito", "delito");
              setDatosDelito(newArrayDelitos);
              let newArrayComparecientes = generarArrayDeObjetosNombreCampoValor(response.data.comparecientes, "nombre", "nombre");
              setDatosCompareciente(newArrayComparecientes);  
              let newArrayProcedimientos = generarArrayDeObjetosNombreCampoValor(response.data.procedimientos, "tipo", "tipo");
              setDatosProcedimiento(newArrayProcedimientos);  
            } else {
                setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`);
            }
        }
        )
        .catch(error => console.log(error));
  };

  useEffect(() => {
    getDataFromDocumento();
  }, []);

  // Función para alternar el estado del botón
  const toggleButton = () => {
    setIsButtonEnabled(prev => !prev);
  };

  const applyFilters = () => {
    //console.log("Filtro mapa juris", filtroJurisprudencial);
    //console.log("Deptos ", selectedDataFilter3);

    /*if(filtroJurisprudencial.departamentos.length === 1){
      setSelectedDataFilter3([...filtroJurisprudencial.departamentos]);
    }*/
  
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
    const searchParamsObj = Object.fromEntries(searchParams.entries());
  
    if(!validarfiltroJurisprudencial(filtroJurisprudencial)) { 
       console.log("entra si hay valores");
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

  const JustFilterFloatNoneGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.up('xs')]: {
      display: isFilterFloat || isSearchAdvance ? 'none' : '',
    }
  }));

  return (
 
    <Card className={isFilterFloat ? (!isShowingFilter ? "card_filter_float_hidden" : "card_filter_float") : "card_filter"} >
      <CardContent>
        <JustFilterFloatNoneGrid>
          <div className="vertical_align">
            <h3> <FilterListIcon /> Filtrar </h3>
          </div>
        </JustFilterFloatNoneGrid>

        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_sala_seccion} selectedData={selectedDataFilter1} setSelectedData={setSelectedDataFilter1}
          label='Sala o Sección' id='sala'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_anios} selectedData={selectedDataFilter2} setSelectedData={setSelectedDataFilter2}
          label='Año de los hechos' id='anio'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={listaDptosJurisprudencial} selectedData={selectedDataFilter3} setSelectedData={setSelectedDataFilter3}
          label='Departamento' id='departamento'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_delito} selectedData={selectedDataFilter4} setSelectedData={setSelectedDataFilter4}
          label='Delito' id='delito'></SelectField>
        <div className='justify_center'>
          {isButtonEnabled && (
            <Button className="link_primary text_lowercase" onClick={toggleButton}> ver más filtros
            </Button>)
          }

          {!isButtonEnabled && (
            <div className="width_100 text_center">

              <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_macrocaso} selectedData={selectedDataFilter5} setSelectedData={setSelectedDataFilter5}
                label='Macrocasos' id='macrocasos'></SelectField>
              <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_compareciente} selectedData={selectedDataFilter6} setSelectedData={setSelectedDataFilter6}
                label='Compareciente' id='compareciente'></SelectField>
              <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_procedimiento} selectedData={selectedDataFilter7} setSelectedData={setSelectedDataFilter7}
                label='Procedimiento' id='procedimiento'></SelectField>

              <Button
                className="link_primary text_lowercase"
                onClick={toggleButton}>
                {!isButtonEnabled && 'ver menos filtros'}

              </  Button>

            </div>
          )

          }
        </div>


        <div className="justify_center width_100 margin_top_s">
          <Button disabled={isFilterDisabled} className="button_primary margin_xs " onClick={applyFilters}>Aplicar filtros</Button>
        </div>
      </CardContent>

    </Card>

  );
}