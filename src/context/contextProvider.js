// ContextProvider.js
import React, { useState } from 'react';
import Context from './context';
import { filtroMapaByDefault } from '../helpers/utils.js';


const ContextProvider = ({ children }) => {
  // Estado que se va a compartir a través del contexto
  const [verTodasDecisiones, setVerTodasDecisiones] = useState(true);
  const [busqueda, setBusqueda] = useState();
  const [busquedaAvanzada, setBusquedaAvanzada] = useState('');
  const [verMasDecisionesRecientes, setVerMasDecisionesRecientes] = useState(0);
  const [isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial] = useState(false);
  const [dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial] = useState(null);
  const [filtroMapaJurisprudencial, setFiltroMapaJurisprudencial] = useState(filtroMapaByDefault);
  const [listaDptosMapaJurisprudencial, setListaDptosMapaJurisprudencial] = useState([]);

  return (
    <Context.Provider value={{ verTodasDecisiones, setVerTodasDecisiones, busqueda, setBusqueda, verMasDecisionesRecientes, setVerMasDecisionesRecientes, isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial, dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial, filtroMapaJurisprudencial, setFiltroMapaJurisprudencial,
    listaDptosMapaJurisprudencial, setListaDptosMapaJurisprudencial }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;