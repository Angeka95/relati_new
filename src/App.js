import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultadosBusqueda from './sections/resultadosBusqueda';
import BusquedaAvanzada from './sections/busquedaAvanzada';
import MapaJurisprudencial from './sections/mapaJurisprudencial';
import ContextProvider from './context/contextProvider';
import Tesauro from './sections/tesauro';
import Boletines from './sections/boletines';
import Suscripcion from './sections/suscripcion';
import Caso from './sections/caso';
import Home from './sections/inicio';
import Analisis from './sections/analisisTematico';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

        <ContextProvider>
          
        <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/caso" element={<Caso />} />
          <Route path="/boletines" element={<Boletines />} />
          <Route path="/suscripcion" element={<Suscripcion />} />
          <Route path="/tesauro" element={<Tesauro />} />
          <Route path="/mapaJurisprudencial" element={<MapaJurisprudencial />} />
          <Route path="/busquedaAvanzada" element={<BusquedaAvanzada />} />
          <Route path="/resultadosBusqueda" element={<ResultadosBusqueda />} />
          <Route path="/analisisTematico" element={<Analisis />} />

          {/* Pagina no encontrada  */}
          {/* <Route path="*" element={<NotFound />} /> */}
        
        </Routes>
      </Router>
        </ContextProvider>
        
      </div>
  );
}

export default App;
