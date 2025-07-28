import React from 'react';
import { useState, useContext } from 'react';
import PaginatorContext from './../../context/paginatorContext.js';
import { Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SortIcon from '@mui/icons-material/Sort';
import { getDecisionesIDsToExport } from './../../helpers/utils.js';
import './../../App.css';

const PaginatorOrderList = () => {

    const { datos, setDatos, getCurrentData, setDatosToExport } = useContext(PaginatorContext);
    
    const [isButtonSorterEnabled, setIsButtonSorterEnabled] = useState(false);

    // Estado del Boton ordenar 
    const toggleButton = () => {
        setIsButtonSorterEnabled(prev => !prev);
    };

    // Función para ordenar en orden ascendente por fecha
    const sortAscByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };

    // Función para ordenar en orden descendente por fecha
    const sortDescByDate = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };
    
    // Función para ordenar en orden ascendente por score
    const sortAscByScore = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(a.score) - new Date(b.score));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };

    // Función para ordenar en orden descendente por score
    const sortDescByScore = () => {
        const sortedDatos = [...datos].sort((a, b) => new Date(b.score) - new Date(a.score));
        setDatos(sortedDatos);
        getCurrentData();
        setIsButtonSorterEnabled(false);
        setDatosToExport(getDecisionesIDsToExport(sortedDatos, "providencia_id"));
    };
    
  return (
      <>
        <Button className="button_function" startIcon={<SortIcon />} onClick={toggleButton}>Ordenar</Button>
        {isButtonSorterEnabled && (
          <div className='container_date_sorted'>
              <Button onClick={sortDescByDate} className='items_sorted' endIcon={<ArrowUpwardIcon />} >Más recientes </Button>
              <Button onClick={sortAscByDate} className='items_sorted' endIcon={<ArrowDownwardIcon />} >Más antiguos </Button>
              <Button onClick={sortDescByScore} className='items_sorted' endIcon={<ArrowUpwardIcon />} >Mayor Relevancia </Button>
              <Button onClick={sortAscByScore} className='items_sorted' endIcon={<ArrowDownwardIcon />} >Menor Relevancia </Button>
          </div>
        )}
      </>
  );
};

export default PaginatorOrderList;