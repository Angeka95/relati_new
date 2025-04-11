// ContextProvider.js
import React, { useState } from 'react';
import Context from './context';
import { filtroByDefault, filtroBusquedaAvanzadaByDefault } from '../helpers/utils.js';


const ContextProvider = ({ children }) => {
  // Estado que se va a compartir a través del contexto
  const [verTodasDecisiones, setVerTodasDecisiones] = useState(true);
  const [estadoVerTodasDecisiones, setEstadoVerTodasDecisiones] = useState(false);
  const [busqueda, setBusqueda] = useState();
  const [verMasDecisionesRecientes, setVerMasDecisionesRecientes] = useState(0);
  const [isDatosMapaJurisprudencial, setIsDatosMapaJurisprudencial] = useState(false);
  const [dptoSelMapaJurisprudencial, setDptoSelMapaJurisprudencial] = useState(null);
  const [filtroJurisprudencial, setFiltroJurisprudencial] = useState(filtroByDefault);  
  const [ttl] = useState(60000); // Variable define el tiempo para eliminar variables de localStorage
  const [ filtroBusquedaAvanzada, setFiltroBusquedaAvanzada ] = useState(filtroBusquedaAvanzadaByDefault); 

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
               estadoVerTodasDecisiones,
               setEstadoVerTodasDecisiones,
               ttl,
               filtroBusquedaAvanzada,
               setFiltroBusquedaAvanzada
            }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;