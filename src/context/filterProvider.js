// FilterProvider.js
import React, { useState, useContext, useEffect } from 'react';
import FilterContext from './filterContext';
import Context from './context';
import { validarfiltroJurisprudencial } from './../helpers/utils';

const FilterProvider = ({ children }) => {
 
    // stringTerm, corresponde al termino de busqueda, es un string
    const [stringTerm, setStringTerm] = useState("");
    
    // selectedFilters, corresponde a los filtros seleccionados en el componente FilterComponent, es un array de strings
    const [selectedFilters, setSelectedFilters] = useState([]);
    
    // filterAttempts, es un contador que se incrementa cada vez que se aplica un filtro
    const [filterAttempts, setFilterAttempts] = useState(0); 
    
    // itemsByFilterAttempts, es un array que contiene los filtros seleccionados en cada intento de filtrado
    const [itemsByFilterAttempts, setItemsByFilterAttempts] = useState([]);
    
    // filtroJurisprudencial, es un objeto que contiene los filtros seleccionados en el componente FilterComponent
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
    
    // Este useEffect recibe el valor del contador filterAttempts, a partir de 1 en adelante actualiza el array itemsByFilterAttempts concatenando los nuevos filtros seleccionados 
    // que estan en selectedFilters y elimina los valores duplicados con Set
    useEffect(() => {
        if(filterAttempts > 0){
            setItemsByFilterAttempts((itemsByFilterAttempts) => {
                let newItems = itemsByFilterAttempts.concat(selectedFilters);
                return [...new Set(newItems)];
            });
        }
    }, [filterAttempts]);
            
    return (
        <FilterContext.Provider 
          value={{ 
                   selectedFilters,
                   setSelectedFilters,
                   stringTerm,
                   setStringTerm,
                   createSelectedFiltersObj,
                   filterAttempts,
                   setFilterAttempts,
                   itemsByFilterAttempts, 
                   setItemsByFilterAttempts
                }} 
        >
          {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;