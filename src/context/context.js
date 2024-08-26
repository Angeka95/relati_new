import React from 'react';

// Crear el contexto con un valor por defecto
const Context = React.createContext({
    verTodasDecisiones: false,
    setVerTodasDecisiones: () => {},
});

// Exportar el contexto para que otros componentes puedan consumirlo
export default Context;