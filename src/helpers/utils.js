/**
 * truncateWithEllipsis()
 * Funcionalidad para truncar con Ellipsis
*/

const truncateWithEllipsis = (text, maxLength = 50) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
}

/**
 * obtenerAnio()
 * Funcionalidad para obtener el anio de una fecha
*/

const obtenerAnio = (fechaStr) => {
    const fecha = new Date(fechaStr);  
    return fecha.getFullYear().toString();         
}

/**
 * obtenerPalabrasFromArrayObject()
 * Funcionalidad para obtener una lista de cadenas de texto separadas por comas a partir de una propiedad de tipo array de objetos
*/

const obtenerPalabrasFromArrayObject = (propiedad) => {
    if(propiedad && propiedad.length > 0) {
       let arrPropiedad = propiedad.map(item => item.propiedad);
       arrPropiedad = [...new Set(arrPropiedad)].toString();
       return arrPropiedad.toLowerCase();
    } else {
        return null;
    }
}

export { truncateWithEllipsis, obtenerAnio, obtenerPalabrasFromArrayObject };