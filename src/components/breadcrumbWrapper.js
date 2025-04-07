import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from './breadcrumbs'; 

export default function BreadcrumbWrapper() {
    const location = useLocation();
  
    // Lista de rutas donde se debe mostrar el breadcrumb
    const breadcrumbRoutes = [
      '/boletines',
      '/suscripcion',
      '/tesauro',
      '/mapa-jurisprudencial',
      '/busqueda-avanzada',
      '/resultados-busqueda',
      '/analisis-tematico',
      '/glosario',
      '/preguntas-frecuentes',
      '/acerca-de-nosotros',
      '/red-terminos'
    ];
  
    // Mapa de rutas a etiquetas
    const breadcrumbItems = {
      '/boletines': 'Boletines',
      '/suscripcion': 'Suscripción',
      '/tesauro': 'Tesauro',
      '/mapa-jurisprudencial': 'Mapa Jurisprudencial',
      '/busqueda-avanzada': 'Búsqueda Avanzada',
      '/resultados-busqueda': 'Resultados de Búsqueda',
      '/analisis-tematico': 'Análisis Temático',
      '/glosario': 'Glosario',
      '/preguntas-frecuentes': 'Preguntas Frecuentes',
      '/acerca-de-nosotros': 'Acerca de Nosotros',
      '/red-terminos': 'Red Términos'
    };

    const items = [];
  
    
  if (breadcrumbRoutes.includes(location.pathname)) {
    items.push({ label: 'Inicio', path: '/' });

    if (location.pathname === '/suscripcion') {
      items.push({ label: 'Boletines', path: '/boletines' });
    }

    else if (location.pathname === '/red-terminos') {
      items.push({ label: 'Tesauro', path: '/tesauro' });
    }

    items.push({ label: breadcrumbItems[location.pathname], path: location.pathname });
  }

  return items.length > 0 ? <Breadcrumb items={items} /> : null;
}