import React from 'react';
import { useContext } from 'react';
import PaginatorContext from './../../context/paginatorContext';

const PruebaInner = () => {

  const { pruebaPaginator } = useContext(PaginatorContext);
    
  return (
      <>
            Prueba Inner: {pruebaPaginator}
      </>
  );
};

export default PruebaInner;