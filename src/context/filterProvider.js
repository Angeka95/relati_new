// FilterProvider.js
import React, { useState, useContext, useEffect } from 'react';
import FilterContext from './filterContext';
import Context from './context';
import { validarfiltroJurisprudencial } from '../helpers/utils.js';

const FilterProvider = ({ children }) => {
 
    const [stringTerm, setStringTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    
    const { filtroJurisprudencial } = useContext(Context);
    
    // Funcion que crea un objeto a partir de filtroJurisprudencial y stringTerm
    // Retorna un objeto con los filtros seleccionados y el string de busqueda
    const createSelectedFiltersObj = (objFiltroJurisprudencial, stringTerm, arrayProvidencias = []) => { 
    
        let newObj = {
              dpto: objFiltroJurisprudencial["departamentos"].join(","),
              anio_providencia:  objFiltroJurisprudencial["anios"].join(","),
              sala_seccion:  objFiltroJurisprudencial["salas"].join(","),
              delito:  objFiltroJurisprudencial["delitos"].join(","),
              macrocaso:  objFiltroJurisprudencial["macrocasos"].join(","),
              tipo_compareciente:  objFiltroJurisprudencial["comparecientes"].join(","),
              procedimiento:  objFiltroJurisprudencial["procedimientos"].map(el => el.trim()).join(","),
              providencias_id: arrayProvidencias.join(","),
              per_page: 10,
              page: 1,
              order: "date_desc"
        };

        return newObj;
    };
    
    // Funcionalidad que llama al servicio POST
    
    // Si el filtroJurisprudencial como variable de contexto es un objeto vacio, tambien se limpia el estado de selectedFilters
    useEffect(() => {
        // Retorna true si el objeto filtroJurisprudencial tiene propiedades vacias
        if(validarfiltroJurisprudencial(filtroJurisprudencial)){ 
            setSelectedFilters([]);
        } 
        
    }, [filtroJurisprudencial]);
            
    return (
        <FilterContext.Provider 
          value={{ 
                   selectedFilters,
                   setSelectedFilters,
                   stringTerm,
                   setStringTerm,
                   createSelectedFiltersObj
                }} 
        >
          {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;