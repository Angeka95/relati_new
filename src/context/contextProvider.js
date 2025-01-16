// ContextProvider.js
import React, { useState } from 'react';
import Context from './context';
import { filtroByDefault } from '../helpers/utils.js';


const ContextProvider = ({ children }) => {
  // Estado que se va a compartir a través del contexto
  const [verTodasDecisiones, setVerTodasDecisiones] = useState(true);
  const [busqueda, setBusqueda] = useState();
  const [verMasDecisionesRecientes, setVerMasDecisionesRecientes] = useState(0);
  const [isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial] = useState(false);
  const [dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial] = useState(null);
  const [filtroJurisprudencial, setFiltroJurisprudencial] = useState(filtroByDefault);
  const [listaDptosJurisprudencial, setListaDptosJurisprudencial] = useState([]);

  return (
    <Context.Provider 
      value={{ verTodasDecisiones, 
               setVerTodasDecisiones, 
               busqueda, 
               setBusqueda, 
               verMasDecisionesRecientes, 
               setVerMasDecisionesRecientes, 
               isDatosMapaJurisprudencial, 
               setIsDatosMapaJurisprudencial, 
               dptoSelMapaJurisprudencial, 
               setDptoSelMapaJurisprudencial, 
               filtroJurisprudencial, 
               setFiltroJurisprudencial,
               listaDptosJurisprudencial, 
               setListaDptosJurisprudencial
            }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;