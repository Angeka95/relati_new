// PaginatorProvider.js
import React, { useState } from 'react';
import PaginatorContext from './paginatorContext';

const PaginatorProvider = ({ children }) => {
  
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [startIndexPage, setStartIndexPage] = useState(0);
  const [endIndexPage, setEndIndexPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); 
  const [customPagination, setCustomPagination] = useState({});
  const [href, setHref] = useState("");
  const [itemsCustomPerPage, setItemsCustomPerPage ] = React.useState(10);
    
  return (
    <PaginatorContext.Provider 
      value={{ 
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
                setItemsCustomPerPage
            }} 
    >
      {children}
    </PaginatorContext.Provider>
  );
};

export default PaginatorProvider;