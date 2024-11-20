import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SelectField from '../components/selectField.js';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import documentoService from '../services/documento.js';
import datos_anios from '../data/data_anios.js';
import datos_macrocaso from '../data/datos_macrocaso.js';
import datos_sala_seccion from '../data/datos_sala_seccion.js';
import Context from '../context/context';
import { validarfiltroMapaJurisprudencial, generarArrayDeObjetosNombreCampoValor } from '../helpers/utils.js';

export default function Filter({ setSelectedFilters, isFilterFloat, isShowingFilter, selectedData, isSearchAdvance }) {
  // Estado para controlar si el botón está habilitado o deshabilitado
  const { verTodasDecisiones, busqueda } = useContext(Context);
  const { filtroMapaJurisprudencial, setFiltroMapaJurisprudencial } = useContext(Context);
  const { listaDptosMapaJurisprudencial, setListaDptosMapaJurisprudencial } = useContext(Context);
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
    //console.log("Filtro mapa juris", filtroMapaJurisprudencial);
    //console.log("Deptos ", selectedDataFilter3);

    if(filtroMapaJurisprudencial.departamentos.length === 1){
      setSelectedDataFilter3([...filtroMapaJurisprudencial.departamentos]);
    }

    setSelectedFilters(
      [
        ...selectedDataFilter1,
        ...selectedDataFilter2,
        ...selectedDataFilter3,
        ...selectedDataFilter4,
        ...selectedDataFilter5,
        ...selectedDataFilter6,
        ...selectedDataFilter7,
      ]
    );

    setFiltroMapaJurisprudencial({
      departamentos: [...selectedDataFilter3],
      anios: [...selectedDataFilter2],
      salas: [...selectedDataFilter1],
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
    if(!validarfiltroMapaJurisprudencial(filtroMapaJurisprudencial)) { 
      //console.log("datos en filter 3", selectedDataFilter3);
      let updateSelectedFilters = [...new Set([
          ...selectedDataFilter1,
          ...selectedDataFilter2,
          ...selectedDataFilter3,
          ...selectedDataFilter4,
          ...selectedDataFilter5,
          ...selectedDataFilter6,
          ...selectedDataFilter7,
        ].concat([...filtroMapaJurisprudencial.departamentos]))];
      if(filtroMapaJurisprudencial.departamentos.length === 1){
        updateSelectedFilters = [...new Set([
          ...selectedDataFilter1,
          ...selectedDataFilter2,
          ...selectedDataFilter4,
          ...selectedDataFilter5,
          ...selectedDataFilter6,
          ...selectedDataFilter7,
        ].concat([...filtroMapaJurisprudencial.departamentos]))];
      } 
      //console.log("updateselectedfilters", updateSelectedFilters);
      setSelectedFilters(updateSelectedFilters);
    }
  }, [filtroMapaJurisprudencial]);


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

        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_sala_seccion} setSelectedData={setSelectedDataFilter1}
          label='Sala o Sección' id='sala'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_anios} setSelectedData={setSelectedDataFilter2}
          label='Año de los hechos' id='anio'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={listaDptosMapaJurisprudencial} setSelectedData={setSelectedDataFilter3}
          label='Departamento' id='departamento'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_delito} setSelectedData={setSelectedDataFilter4}
          label='Delito' id='delito'></SelectField>
        <div className='justify_center'>
          {isButtonEnabled && (
            <Button className="link_primary text_lowercase" onClick={toggleButton}> ver más filtros
            </Button>)
          }

          {!isButtonEnabled && (
            <div className="width_100 text_center">

              <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_macrocaso} setSelectedData={setSelectedDataFilter5}
                label='Macrocasos' id='macrocasos'></SelectField>
              <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_compareciente} setSelectedData={setSelectedDataFilter6}
                label='Compareciente' id='compareciente'></SelectField>
              <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_procedimiento} setSelectedData={setSelectedDataFilter7}
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