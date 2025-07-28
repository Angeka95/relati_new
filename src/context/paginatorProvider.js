// PaginatorProvider.js
import React, { useState } from 'react';
import PaginatorContext from './paginatorContext';

const PaginatorProvider = ({ children }) => {
  
  const [datos, setDatos] = useState([]);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [startIndexPage, setStartIndexPage] = useState(0);
  const [endIndexPage, setEndIndexPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); 
  const [customPagination, setCustomPagination] = useState({});
  const [href, setHref] = useState("");
  const [itemsCustomPerPage, setItemsCustomPerPage ] = React.useState(10);
  
  // Manipulación de datos de la paginación y que se exportaran
  
  // currentData, setCurrentData y getCurrentData permiten manipular los datos que se muestran en la paginación
  const [currentData, setCurrentData] = useState([]);
  const [datosToExport, setDatosToExport] = useState("");
  
  const getCurrentData = (items = 0) => {
    if (items === 0) {
            items = itemsPerPage;
    }
    const startIndex = (page - 1) * items;
    setCurrentData(datos.slice(startIndex, startIndex + items));
  };
  
  // Fin manipulación de datos de la paginación y que se exportaran
    
  return (
    <PaginatorContext.Provider 
      value={{ 
                datos,
                setDatos,
                page,
                setPage,
                itemsPerPage,
                setItemsPerPage,
                startIndexPage, 
                setStartIndexPage,
                endIndexPage,
                setEndIndexPage,
                customPagination,
                setCustomPagination,
                totalPages,
                setTotalPages,
                href,
                setHref,
                itemsCustomPerPage,
                setItemsCustomPerPage,
                currentData,
                setCurrentData,
                getCurrentData,
                datosToExport,
                setDatosToExport
            }} 
    >
      {children}
    </PaginatorContext.Provider>
  );
};

export default PaginatorProvider;