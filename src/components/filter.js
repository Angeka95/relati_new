
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

    "nombre_campo": "Sala de Reconocimiento",
    "valor": "Sala 01"
  },
  {
    "nombre_campo": "Sala de Amnistía",
    "valor": "Sala 02"
  },
  {
    "nombre_campo": "Sala de Definición",
    "valor": "Sala 03"
  },
  {
    "nombre_campo": "Sección de Reconocimiento",
    "valor": "Sección 01"
  }
]


const datos_anios = [

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

    "nombre_campo": "Macrocaso 01",
    "valor": "01"
  },
  {
    "nombre_campo": "Macrocaso 02",
    "valor": "02"
  },
  {
    "nombre_campo": "Macrocaso 03",
    "valor": "03"
  },
  {
    "nombre_campo": "Macrocaso 04",
    "valor": "04"
  }
]

const datos_departamento = [

  {

    "nombre_campo": "Departamento 01",
    "valor": "01"
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

  {

    "nombre_campo": "Compareciente 01",
    "valor": "01"
  },
  {
    "nombre_campo": "Compareciente 02",
    "valor": "02"
  },
  {
    "nombre_campo": "Compareciente 03",
    "valor": "03"
  },
  {
    "nombre_campo": "Compareciente 04",
    "valor": "04"
  }
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





export default function Filter({ setSelectedFilters, isFilterFloat, isShowingFilter, selectedData, isSearchAdvance}) {
  // Estado para controlar si el botón está habilitado o deshabilitado
  const { verTodasDecisiones, busqueda } = useContext(Context);
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
    setSelectedDataAllFilters(
      [
        ...selectedDataFilter1,
        ...selectedDataFilter2,
        ...selectedDataFilter3,
        ...selectedDataFilter4,
        ...selectedDataFilter5,
        ...selectedDataFilter6,
        ...selectedDataFilter7,
      ]
    )
  };


  useEffect(() => {
    setSelectedFilters(selectedDataAllFilters);
  }, [selectedDataAllFilters]);

  useEffect(() => {
    if (!verTodasDecisiones && !busqueda) {
      setIsFilterDisabled(true);
      setSelectedDataAllFilters([])
    }
    else {
      setIsFilterDisabled(false);
    }


  }, [verTodasDecisiones, busqueda]);

  const  JustFilterFloatNoneGrid = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.up('xs')]: {
        display: isFilterFloat || isSearchAdvance ? 'none' : '',
    }
}));

  return (

    <Card className= {isFilterFloat ? (!isShowingFilter ? ("card_filter_float_hidden" ) : "card_filter_float") : "card_filter"} >
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
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_departamento} setSelectedData={setSelectedDataFilter3}
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