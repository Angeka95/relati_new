
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
import Context from '../context/context';


const datos_sala_seccion = [
  {
    "nombre_campo": "S - Sala de Reconocimiento de Verdad, de Responsabilidad y de Determinación de los Hechos y Conductas",
    "valor": 1
  },
  {
    "nombre_campo": "S - Sala de Amnistía o Indulto",
    "valor": 2
  },
  {
    "nombre_campo": "S - Sala de Definición de Situaciones Jurídicas",
    "valor": 3
  },
  {
    "nombre_campo": "T - Sección de Reconocimiento de Verdad y Responsabilidad",
    "valor": 4
  },
  {
    "nombre_campo": "T - Sección con Ausencia de Reconocimiento de Verdad y de Responsabilidad",
    "valor": 5
  },
  {
    "nombre_campo": "T - Sección de Revisión de Sentencias",
    "valor": 6
  },
  {
    "nombre_campo": "T - Sección de Apelación",
    "valor": 7
  },
];

const datos_anios = [
  {
    "nombre_campo": "2024",
    "valor": "2024"
  },
  {
    "nombre_campo": "2023",
    "valor": "2023"
  },
  {
    "nombre_campo": "2022",
    "valor": "2022"
  },
  {
    "nombre_campo": "2021",
    "valor": "2021"
  },
  {
    "nombre_campo": "2020",
    "valor": "2020"
  },
  {
    "nombre_campo": "2019",
    "valor": "2019"
  },
  {
    "nombre_campo": "2018",
    "valor": "2018"
  },
  {
    "nombre_campo": "2017",
    "valor": "2017"
  },
  {
    "nombre_campo": "2016",
    "valor": "2016"
  },
  {
    "nombre_campo": "2015",
    "valor": "2015"
  },
  {
    "nombre_campo": "2014",
    "valor": "2014"
  }
]

const datos_macrocaso = [

  {
    "nombre_campo": "Caso 001",
    "valor": "Caso 001"
  },
  {
    "nombre_campo": "Caso 002",
    "valor": "Caso 002"
  },
  {
    "nombre_campo": "Caso 003",
    "valor": "Caso 003"
  },
  {
    "nombre_campo": "Caso 004",
    "valor": "Caso 004"
  },
  {
    "nombre_campo": "Caso 005",
    "valor": "Caso 005"
  },
  {
    "nombre_campo": "Caso 006",
    "valor": "Caso 006"
  },
  {
    "nombre_campo": "Caso 007",
    "valor": "Caso 007"
  },
  {
    "nombre_campo": "Caso 008",
    "valor": "Caso 008"
  },
  {
    "nombre_campo": "Caso 009",
    "valor": "Caso 009"
  },
  {
    "nombre_campo": "Caso 010",
    "valor": "Caso 010"
  },
  {
    "nombre_campo": "Caso 011",
    "valor": "Caso 011"
  }
]

const datos_departamento = [

  {

    "nombre_campo": "Departamento 001",
    "valor": "001"
  },
  {
    "nombre_campo": "Departamento 02",
    "valor": "02"
  },
  {
    "nombre_campo": "Departamento 03",
    "valor": "03"
  },
  {
    "nombre_campo": "Departamento 04",
    "valor": "04"
  }
]

const datos_delito = [

  {

    "nombre_campo": "Delito 01",
    "valor": "01"
  },
  {
    "nombre_campo": "Delito 02",
    "valor": "02"
  },
  {
    "nombre_campo": "Delito 03",
    "valor": "03"
  },
  {
    "nombre_campo": "Delito 04 ",
    "valor": "04"
  }
]

const datos_compareciente = [
  { "nombre_campo": "AENIFPU- AGENTE DEL ESTADO NO INTEGRANTE DE LA FUERZA PÚBLICA", "valor": "AENIFPU- AGENTE DEL ESTADO NO INTEGRANTE DE LA FUERZA PÚBLICA" },
  { "nombre_campo": "DELINCUENCIA COMÚN", "valor": "DELINCUENCIA COMÚN" },
  { "nombre_campo": "FARC-EP", "valor": "FARC-EP" },
  { "nombre_campo": "FUERZA PÚBLICA", "valor": "FUERZA PÚBLICA" },
  { "nombre_campo": "GRUPO ARMADO NO FIRMANTE", "valor": "GRUPO ARMADO NO FIRMANTE" },
  { "nombre_campo": "NO APLICA", "valor": "NO APLICA" },
  { "nombre_campo": "PROTESTA SOCIAL", "valor": "PROTESTA SOCIAL" },
  { "nombre_campo": "TERCERO CIVIL", "valor": "TERCERO CIVIL" },
  { "nombre_campo": "TERCERO CIVIL Y AENIFPU", "valor": "TERCERO CIVIL Y AENIFPU" },
  { "nombre_campo": "TERCERO FINANCIADOR O COLABORADOR DE LOS PARAMILITARES", "valor": "TERCERO FINANCIADOR O COLABORADOR DE LOS PARAMILITARES" },
  { "nombre_campo": "TERCERO FINANCIADOR O COLABORADOR DE OTRO ACTOR DEL CONFLICTO", "valor": "TERCERO FINANCIADOR O COLABORADOR DE OTRO ACTOR DEL CONFLICTO" },
  { "nombre_campo": "TERCERO FINANCIADOR O COLABORADOR DE LAS FARC-EP", "valor": "TERCERO FINANCIADOR O COLABORADOR DE LAS FARC-EP" },
  { "nombre_campo": "VÍCTIMA(S)", "valor": "VÍCTIMA(S)" }
]

const datos_procedimiento = [

  {

    "nombre_campo": "Procedimiento 01",
    "valor": "01"
  },
  {
    "nombre_campo": "Procedimiento 02",
    "valor": "02"
  },
  {
    "nombre_campo": "Procedimiento 03",
    "valor": "03"
  },
  {
    "nombre_campo": "Procedimiento 04",
    "valor": "04"
  }
]





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

  // Función para alternar el estado del botón
  const toggleButton = () => {
    setIsButtonEnabled(prev => !prev);
  };

  const applyFilters = () => {
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
      delitos: [],
      macrocasos: [...selectedDataFilter5],
      comparecientes: [...selectedDataFilter6],
      procedimientos: []
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
    console.log('Renderizando...');
  }, []);
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