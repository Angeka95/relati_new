import { useMantenimientoSitio } from '../hooks/useMantenimientoSitio';

export default function MaintenanceWrapper() {
  //Hook para verificar si la aplicación está en mantenimiento
  useMantenimientoSitio();
  return null; // no renderiza nada, solo ejecuta el hook
}