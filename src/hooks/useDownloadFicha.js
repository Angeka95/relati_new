import React, {useCallback} from 'react';

import aplicacion from '../services/aplicacion';

export function useDownloadFicha() {

  // Funcion que cuenta el numero de descargas de la ficha
  // Retorna solo valor true
  const countDownloadedFichaBtn =  useCallback((event, ficha_ID, linkFicha) => {
    event.preventDefault();
    aplicacion
      .countDownloadedFicha(ficha_ID)
      .then(response => {
          console.log('Downloaded');
      }
    )
    .catch(error => {
      console.error(error);
    });
    setTimeout(() => {
      window.open(linkFicha, '_blank');
    }, 1000);
  }, []);

  return countDownloadedFichaBtn;

};