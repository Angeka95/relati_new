import { useState, useEffect } from 'react';
import tesauroService from './../../services/tesauro';

function useGetTermsByLetter(letter) {
  
  const [terminos, setTerminos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
      tesauroService
        .getTermsByLetter(letter)
        .then(data => { 
            if((data.status !== undefined) && (data.status === 401)) {
              setMessage(`Error: ${data.status}. ${data.reason}`);
            } else {
              const terminosArr = ((data.terms.result === undefined) || (data.terms.result === null)) ? [] : Object.values(data.terms.result);
              const newTerminosArr = terminosArr.map(item => item.string);
              setMessage(`Success: 200. OK`); 
              setTerminos(newTerminosArr);
            }
          }
        )
        .catch(error => console.log(error));
  }, []);
  
  return { terminos, message };

}

export default useGetTermsByLetter;