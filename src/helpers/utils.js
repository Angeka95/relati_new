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
 * - property: propiedad para extraer el valor. De tipo de dato string.
 * - subproperty: es la propiedad para extraer el valor de un objeto que hace parte de un array a nivel secundario. De tipo de dato string. Por defecto es null
 * - setToLowerCase: es un campo de tipo de dato boolean que permite definir si el campo se ajusta a minusculas, por defecto es true, o dejarlo false si se desea en su formato original
 * Salida:
 * - Retorna un array de elementos de cadenas de texto
 * Aplicación:
 * - Filtros de busqueda en Mapa Jurisprudencial
 * - Informacion en tarjetas de fichas jurisprudenciales y de decision
*/

const obtenerPalabrasFromArrayObject = (arrObj, property, subproperty = null, setLowerCase = true) => {
    if(arrObj && arrObj.length > 0) {
       let newArr = arrObj.map(item => item[property]);
       if(subproperty !== null){
        newArr = newArr.map(item => item[subproperty]);
       }
       newArr = [...new Set(newArr)].join(", ");
       if(setLowerCase === false){
            return newArr;
       } else {
            return newArr.toLowerCase();
       }
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

/**
 * generarArrayDeObjetosNombreCampoValor()
 * Funcionalidad que genera un nuevo array basado en la estructura
 * 
 * Parametros de entrada:
 * - valores: el array de objetos
 * - propiedad_1: string, nombre de propiedad del objeto
 * - propiedad_2: string, nombre de propiedad del objeto
 * Salida:
 * - Retorna un array de objetos de tipo {
    "nombre_campo": "mismo_valor",
    "valor": "mismo_valor"
    } 
 * Aplicación:
 * - getDataFromDocumento() en filter.js
*/
const generarArrayDeObjetosNombreCampoValor = (valores, propiedad_1, propiedad_2) => {
    return valores.map(valor => ({
      nombre_campo: valor[propiedad_1],
      valor: valor[propiedad_2]
    }));
};

/**
 * getParametroDeUrl()
 * Funcionalidad que obtiene el ID de una URL de Spreaker
 * -  Busca la primera URL en la cadena usando una expresión regular
 * -  Devuelve null si no se encuentra una URL
 * -  Crea un objeto URL con la primera URL encontrada
 * -  Obtiene el valor del parámetro especificado
 * Parametros de entrada:
 * - cadena: Direccion URL con parametros 
 * - parametro: string, nombre del parametro a extraer datos
 * Salida:
 * - Retorna un string
 * Aplicación:
 * - getParametroDeUrl() en caso.js para obtener ID de Spreaker
*/
const getParametroDeUrl = (cadena, parametro) => {
    const urlMatch = cadena.match(/https?:\/\/[^\s]+/);
    if (!urlMatch) return null; 
    const url = new URL(urlMatch[0]); 
    return url.searchParams.get(parametro); 
};

function extraerSpreakerID(url) {
    // Busca el patrón "--" seguido de cualquier grupo de caracteres al final de la URL
    const match = url.match(/--([a-zA-Z0-9]+)$/);

    // Si encuentra coincidencias, devuelve el grupo capturado
    return match ? match[1] : null;
}


export { filtroMapaByDefault, 
         truncateWithEllipsis, 
         obtenerAnio, 
         obtenerPalabrasFromArrayObject, 
         validarfiltroMapaJurisprudencial, 
         generarArrayDeObjetosNombreCampoValor,
         getParametroDeUrl,
         extraerSpreakerID
        };