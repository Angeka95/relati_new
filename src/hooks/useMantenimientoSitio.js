import { useEffect, useState } from 'react';
import aplicacionService from '../services/aplicacion.js';
import { useNavigate } from "react-router-dom";

export function useMantenimientoSitio() {

    const navigate = useNavigate();
    
    const MAINTENANCE_PATH = "/error";
    
     const [stateEnabled, setStateEnabled] = useState(false);
    
    // Hook que permite redireccionar a pagina de error en caso de mantenimiento
    const setModoMantenimientoApp = () => { 
        aplicacionService
          .getStatusRelatiAppxMantenimiento()
          .then(response => {
              const isEnabled = response.data[0].enabled;
              setStateEnabled(isEnabled);
              localStorage.setItem('maintenance', JSON.stringify(isEnabled)); // Store in localStorage
           })
          .catch(error => console.log(error));
    }
      
    useEffect(() => {
    
        setModoMantenimientoApp();
        const maintenanceEnabled = JSON.parse(localStorage.getItem('maintenance'));
        if (maintenanceEnabled && stateEnabled) {
            navigate(MAINTENANCE_PATH);
            window.scrollTo(0, 0);
        } 
        
    }, [navigate, stateEnabled]);
    
    return false;
};
