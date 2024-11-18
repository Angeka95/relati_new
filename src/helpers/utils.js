/** 
 * filtroMapaByDefault
 * Objeto inicial que almacena las opciones seleccionadas por el usuario en el filtro
*/
const filtroMapaByDefault = {
    departamentos: [],
    anios: [],
    salas: [],
    delitos: [],
    macrocasos: [],
    comparecientes: [],
    procedimientos: []
}; 

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
 * Parametros de entrada:
 * - arrObj: el array de objetos
 * - property: propiedad para extraer el valor
 * Salida:
 * - Retorna un array de elementos de cadenas de texto
 * Aplicación:
 * - Filtros de busqueda en Mapa Jurisprudencial
*/

const obtenerPalabrasFromArrayObject = (arrObj, property) => {
    if(arrObj && arrObj.length > 0) {
       let newArr = arrObj.map(item => item[property]);
       newArr = [...new Set(newArr)].join(", ");
       return newArr.toLowerCase();
    } else {
        return "";
    }
}

/**
 * validarfiltroMapaJurisprudencial()
 * Funcionalidad que verificar si el array del filtro de mapa tiene sus propiedades de tipo array vacias
 * Parametros de entrada:
 * - obj: el objeto que hace referencia a filtroMapaJurisprudencial en el contextProvider
 * Salida:
 * - Retorna true si el objeto filtroMapaJurisprudencial tiene propiedades vacias
 * - Retorna false si alguna de las propiedades del objeto filtroMapaJurisprudencial tiene alguna propiedad con datos
 * Aplicación:
 * - useEffect en listCardSearchMapaResults.js
*/
const validarfiltroMapaJurisprudencial = (obj) => {
    for (let propiedad in obj) {
        if (Array.isArray(obj[propiedad]) && obj[propiedad].length > 0) {
            return false;
        }
    }
    return true;
};

export { filtroMapaByDefault, truncateWithEllipsis, obtenerAnio, obtenerPalabrasFromArrayObject, validarfiltroMapaJurisprudencial };