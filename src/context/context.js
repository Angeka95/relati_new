import React from 'react';

// Creacion del contexto
const Context = React.createContext({
    verTodasDecisiones: false,
    setVerTodasDecisiones: () => {}
});

export default Context;