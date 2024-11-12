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

const obtenerPalabrasFromArrayObject = (arrObj, property) => {
    if(arrObj && arrObj.length > 0) {
       let newArr = arrObj.map(item => item[property]);
       newArr = [...new Set(newArr)].toString();
       return newArr.toLowerCase();
    } else {
        return "";
    }
}

export { truncateWithEllipsis, obtenerAnio, obtenerPalabrasFromArrayObject };