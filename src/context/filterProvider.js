// FilterProvider.js
import React, { useState, useContext, useEffect } from 'react';
import FilterContext from './filterContext';
import Context from './context';
import { validarfiltroJurisprudencial } from '../helpers/utils.js';

const FilterProvider = ({ children }) => {
 
    const [stringTerm, setStringTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    
    const { filtroJurisprudencial, setFiltroJurisprudencial } = useContext(Context);
    
    // Funcion que crea un objeto a partir de filtroJurisprudencial y stringTerm
    // Retorna un objeto con los filtros seleccionados y el string de busqueda
    const createSelectedFiltersQryObjectSearchRes = (objFiltroJurisprudencial, stringTerm, arrayProvidencias = []) => { 
        let newObj = {
              from_filter: true,
              string: stringTerm,
              dpto: objFiltroJurisprudencial["departamentos"].join(","),
              anio_providencia:  objFiltroJurisprudencial["anios"].join(","),
              sala_seccion:  objFiltroJurisprudencial["salas"].join(","),
              delito:  objFiltroJurisprudencial["delitos"].join(","),
              macrocaso:  objFiltroJurisprudencial["macrocasos"].join(","),
              tipo_compareciente:  objFiltroJurisprudencial["comparecientes"].join(","),
              procedimiento:  objFiltroJurisprudencial["procedimientos"].map(el => el.trim()).join(","),
              providencias_id: arrayProvidencias.slice(0,10).join(","),
              size: 10,
              page: 1,
              order: "date_desc"
        };

        return newObj;
    };
    
    // Funcion que convierte un objeto de filtros en un string de consulta URL
    // Ej. ?string=SECUESTRO%20EXTORSIVO%20AGRAVADO&dpto=ANTIOQUIA&anio_providencia=2018%2C2021&sala_seccion=S%20-%20Sala%20de%20Amnist%C3%ADa%20o%20Indulto%2CT%20-%20Secci%C3%B3n%20de%20Apelaci%C3%B3n&delito=ABORTO%20FORZADO%2CACCESO%20CARNAL%20ABUSIVO%20CON%20MENOR%20DE%20CATORCE%20A%C3%91OS&macrocaso=01%2C05&tipo_compareciente=FUERZA%20P%C3%9ABLICA%2CFARC-EP%20%2F%20FARC-EP%20%2F%20FARC-EP%20%2F%20FARC-EP%20%2F%20FARC-EP%20%2F%20FARC-EP&procedimiento=ACCI%C3%93N%20DE%20TUTELA%2CACUMULACI%C3%93N&providencias_id=&size=10&page=1
    const createSelectedFiltersQryStringSearchRes = (objFiltroJurisprudencial, stringTerm, arrayProvidencias) => {
        const qryObject = createSelectedFiltersQryObjectSearchRes(objFiltroJurisprudencial, stringTerm, arrayProvidencias);
        let qryString = `string=${encodeURIComponent(qryObject.string)}`;
        qryString += `&from_filter=${encodeURIComponent(qryObject.from_filter)}`;
        qryString += `&dpto=${encodeURIComponent(qryObject.dpto)}`;
        qryString += `&anio_providencia=${encodeURIComponent(qryObject.anio_providencia)}`;
        qryString += `&sala_seccion=${encodeURIComponent(qryObject.sala_seccion)}`;
        qryString += `&delito=${encodeURIComponent(qryObject.delito)}`;
        qryString += `&macrocaso=${encodeURIComponent(qryObject.macrocaso)}`;
        qryString += `&tipo_compareciente=${encodeURIComponent(qryObject.tipo_compareciente)}`;
        qryString += `&procedimiento=${encodeURIComponent(qryObject.procedimiento)}`;
        qryString += `&providencias_id=${encodeURIComponent(qryObject.providencias_id)}`;
        qryString += `&size=${encodeURIComponent(qryObject.size)}`;
        qryString += `&page=${encodeURIComponent(qryObject.page)}`;
        qryString += `&order=${encodeURIComponent(qryObject.order)}`;
        return qryString;
    }
    
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
                   createSelectedFiltersQryStringSearchRes
                }} 
        >
          {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;