import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Context from '../../context/context';
import { Container, Grid, Card, CardContent, Box, Button, CardActions, FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SelectField from '../../components/selectField.js';
import datos_tipo_documento from '../../data/data_tipo_documento.js';
import datos_anios from '../../data/data_anios.js';
import datos_sala_seccion from '../../data/datos_sala_seccion.js';
import { } from '../../helpers/utils.js';
import '../../App.css';

export default function Filter({ setSelectedFilters, isFilterFloat, isShowingFilter, selectedData, isSearchAdvance }) {

  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [isFilterDisabled, setIsFilterDisabled] = useState(false);

  const [selectedDataFilter1, setSelectedDataFilter1] = useState([]); //Tipo Documento
  const [selectedDataFilter2, setSelectedDataFilter2] = useState([]); //Anios
  const [selectedDataFilter3, setSelectedDataFilter3] = useState([]); //Sala seccion

  const { filtroBusquedaAvanzada, setFiltroBusquedaAvanzada } = useContext(Context);
  
  // Función para alternar el estado del botón
  const toggleButton = () => {
    setIsButtonEnabled(prev => !prev);
  };

  // Almacena los valores de los filtros seleccionados
  const applyFilters = () => {
    setSelectedFilters(
      [
        ...selectedDataFilter1,  //Tipo Documento
        ...selectedDataFilter2,  //Anios
        ...selectedDataFilter3,  //Sala seccion
      ]
    );
    setFiltroBusquedaAvanzada({
      tipo_documento: [...selectedDataFilter1],
      anio: [...selectedDataFilter2],
      sala_seccion: [...selectedDataFilter3]
    });
  };
  
  // Grid personalizado para filtro flotante
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
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_tipo_documento} selectedData={selectedDataFilter1} setSelectedData={setSelectedDataFilter1}
          label='Tipo de Documento' id='tipo_documento'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_anios} selectedData={selectedDataFilter2} setSelectedData={setSelectedDataFilter2}
          label='Año de los hechos' id='anio'></SelectField>
        <SelectField isDisabled={isFilterDisabled} datos_filtros={datos_sala_seccion} selectedData={selectedDataFilter3} setSelectedData={setSelectedDataFilter3} label='Sala o Sección' id='sala'></SelectField>
        <div className="justify_center width_100 margin_top_s">
          <Button disabled={isFilterDisabled} className="button_primary margin_xs " onClick={applyFilters}>Aplicar filtros</Button>
        </div>
      </CardContent>
    </Card>
  );
}