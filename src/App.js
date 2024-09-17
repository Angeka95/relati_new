import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultadosBusqueda from './sections/resultadosBusqueda';
import BusquedaAvanzada from './sections/busquedaAvanzada';
import Map from './sections/mapaJurisprudencial';
import ContextProvider from './context/contextProvider';
import Tesauro from './sections/tesauro'
import Boletines from './sections/boletines'

function App() {
  return (
    <div className="App">

        <ContextProvider>
          
        <Boletines> 
        </Boletines> 
        </ContextProvider>
        
      </div>
  );
}

export default App;
