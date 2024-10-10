// ContextProvider.js
import React, { useState } from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {
  // Estado que se va a compartir a través del contexto
  const [verTodasDecisiones, setVerTodasDecisiones] = useState(true);
  const [busqueda, setBusqueda] = useState();
  const [busquedaAvanzada, setBusquedaAvanzada] = useState('');
  const [verMasDecisionesRecientes, setVerMasDecisionesRecientes] = useState(0);

  return (
    <Context.Provider value={{ verTodasDecisiones, setVerTodasDecisiones, busqueda, setBusqueda, verMasDecisionesRecientes, setVerMasDecisionesRecientes }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;