import './App.css'; 
import ResultadosBusqueda from './sections/resultadosBusqueda';
import BusquedaAvanzada from './sections/busquedaAvanzada';
import Map from './sections/mapaJurisprudencial';
import ContextProvider from './context/contextProvider';
import Tesauro from './sections/tesauro'

function App() {
  return (
    <div className="App">

        <ContextProvider>
          
        <Tesauro> 
        </Tesauro> 
        </ContextProvider>
        
      </div>
  );
}

export default App;
