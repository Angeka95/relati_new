import React, { useState, useEffect, useContext } from 'react';

export function useCleanLocalStorageVars(localStorageVar, ttl) {
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          localStorage.removeItem(localStorageVar);
        }, ttl);
        return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta
    }, []);
    
    return false;
};



