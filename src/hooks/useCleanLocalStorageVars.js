import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/context.js';

export function useCleanLocalStorageVars() {

    const { ttl } = useContext(Context);
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          //localStorage.removeItem('stringQueryLs');
          localStorage.removeItem('dataFromQueryLs');
        }, ttl);
        return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta
    }, []);
    
    return false;
};



