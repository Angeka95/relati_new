import { useState, useEffect } from 'react';
import tesauroService from '../../services/tesauro';

function useGetDocsByTerm(selectedTerm) {
  
  const [resultados, setResultados] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
      tesauroService
        .getDocsByTerm(selectedTerm)
        .then(response => {
            if((response.status_info.status === 200) && (response.data.length > 0)) {
                const cardsArr = response.data.map(item => {
                    return {
                      id: item._source.id,
                      fecha: item._source.fecha_documento,
                      asunto: item._source.asunto,
                      salaOSeccion: item._source.despacho,
                      nombreDecision: "Sentencia SRT-ST-117-2024",
                      grupoPertence: "Grupo armado no firmante",
                      lugarHechos: "Acacías, Meta",
                      magistrado: "Augusto Rodriguez",
                      macrocaso: "08 ",
                      conclusionDecision: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,",
                      extractoBusqueda: "extracto busqueda"
                    }
                });
                setMessage(`Success: ${response.status_info.status}. ${response.status_info.reason}`)
                setResultados(cardsArr);
            } else {
               setMessage(`Error: ${response.status_info.status}. ${response.status_info.reason}`)
            }
          }
        )
        .catch(error => console.log(error));
  }, []);

  return { resultados, message };

}

export default useGetDocsByTerm;