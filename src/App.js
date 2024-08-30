import './App.css'; 
import ResultadosBusqueda from './sections/resultadosBusqueda';
import Map from './sections/mapaJurisprudencial';
import ContextProvider from './context/contextProvider';

function App() {
  return (
    <div className="App">

        <ContextProvider>
          
          <Map></Map>
        </ContextProvider>
        
      </div>
  );
}

export default App;
