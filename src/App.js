import './App.css'; 
import ResultadosBusqueda from './sections/resultadosBusqueda';
import BusquedaAvanzada from './sections/busquedaAvanzada';
import Map from './sections/mapaJurisprudencial';
import ContextProvider from './context/contextProvider';

function App() {
  return (
    <div className="App">

        <ContextProvider>
          
          <BusquedaAvanzada>
            
          </BusquedaAvanzada>
        </ContextProvider>
        
      </div>
  );
}

export default App;
