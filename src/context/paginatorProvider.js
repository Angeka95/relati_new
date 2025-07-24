// ContextProvider.js
import React, { useState } from 'react';
import PaginatorContext from './paginatorContext';

const PaginatorProvider = ({ children }) => {

  const [pruebaPaginator, setPruebaPaginator] = useState("Context Prueba Paginator");

  return (
    <PaginatorContext.Provider 
      value={{ 
                pruebaPaginator, 
                setPruebaPaginator
            }} 
    >
      {children}
    </PaginatorContext.Provider>
  );
};

export default PaginatorProvider;