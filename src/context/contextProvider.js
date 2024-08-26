// ContextProvider.js
import React, { useState } from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {
  // Estado que se va a compartir a través del contexto
  const [verTodasDecisiones, setVerTodasDecisiones] = useState(false);
  const [busqueda, setBusqueda] = useState("Competencia de la JEP");

  return (
    <Context.Provider value={{ verTodasDecisiones, setVerTodasDecisiones, busqueda, setBusqueda }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;