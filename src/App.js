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
import Glosario from './sections/glosario'
import PreguntasFrecuentes from './sections/preguntasFrecuentes'
import Acerca from './sections/acercaDeNosotros'
import Menu from './sections/menu'
import Footer from './sections/footer'
import Libros from './sections/libros'
import Breadcrumb from './components/breadcrumbs';
import BreadcrumbWrapper from './components/breadcrumbWrapper';
import EnfoqueGenero from './sections/enfoqueGenero';
import VerTodasLasDecisiones from './sections/verTodasLasDecisiones';
import TestServices from './sections/testServices';
import Error from './sections/error';
import { BrowserRouter as Router, Route, Routes,  useLocation } from 'react-router-dom';
import MaintenanceWrapper from './components/ManteinanceWrapper';
import RedTerminos from './sections/redTerminos';

function App() {

  return (
    <div className="App">

        <ContextProvider>
          
        <Router>
        
        <MaintenanceWrapper />
        <Menu />
        <BreadcrumbWrapper />
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caso/:casoId" element={<Caso />} />
          <Route path="/boletines" element={<Boletines />} />
          <Route path="/suscripcion" element={<Suscripcion />} />
          <Route path="/tesauro" element={<Tesauro />} />
          <Route path="/mapa-jurisprudencial" element={<MapaJurisprudencial />} />
          <Route path="/busqueda-avanzada" element={<BusquedaAvanzada />} />
          <Route path="/resultados-busqueda" element={<ResultadosBusqueda />} />
          <Route path="/analisis-tematico" element={<Analisis />} />
       
          <Route path="/glosario" element={<Glosario />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/acerca-de-nosotros" element={<Acerca />} />
          <Route path="/libros" element={<Libros/>} />
          <Route path="/enfoqueGenero" element={<EnfoqueGenero/>} />
          <Route path="/testServices" element={<TestServices/>} />
          <Route path="/ver-todas-las-decisiones" element={<VerTodasLasDecisiones/>} />
          <Route path="/red-terminos" element={<RedTerminos/>} />
          <Route path="/error" element={<Error/>} />

          
          {/* Pagina no encontrada  */}
          {/* <Route path="*" element={<NotFound />} /> */}
        
        </Routes>
        <Footer />
      </Router>
        </ContextProvider>
        
      </div>
  );
}

export default App;
