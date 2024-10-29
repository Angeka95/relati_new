// ContextProvider.js
import React, { useState } from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {
  // Estado que se va a compartir a través del contexto
  const [verTodasDecisiones, setVerTodasDecisiones] = useState(true);
  const [busqueda, setBusqueda] = useState();
  const [busquedaAvanzada, setBusquedaAvanzada] = useState('');
  const [verMasDecisionesRecientes, setVerMasDecisionesRecientes] = useState(0);
  const [isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial] = useState(true);
  const [dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial] = useState(null);

  return (
    <Context.Provider value={{ verTodasDecisiones, setVerTodasDecisiones, busqueda, setBusqueda, verMasDecisionesRecientes, setVerMasDecisionesRecientes, isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial, dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;