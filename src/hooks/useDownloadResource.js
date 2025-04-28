import React, {useCallback} from 'react';

import aplicacion from '../services/aplicacion';

export function useDownloadResource() {

  // Funcion que cuenta el numero de descargas de la ficha
  // Retorna solo valor true
  const countDownloadedBtn =  useCallback((event, resource_ID, resource_link) => {
    event.preventDefault();
    aplicacion
      .countDownloadedFicha(resource_ID)
      .then(response => {
          console.log('Downloaded');
      }
    )
    .catch(error => {
      console.error(error);
    });
    setTimeout(() => {
      window.open(resource_link, '_blank');
    }, 1000);
  }, []);

  return countDownloadedBtn;

};