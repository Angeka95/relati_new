import DOMPurify from 'dompurify';
import datos_sala_seccion from '../data/datos_sala_seccion.js';
/** 
 * filtroByDefault
 * Objeto inicial que almacena las opciones seleccionadas por el usuario en el filtro
*/
const filtroByDefault = {
    departamentos: [],
    anios: [],
    salas: [],
    delitos: [],
    macrocasos: [],
    comparecientes: [],
    procedimientos: []
}; 

/** 
 * filtroBusquedaAvanzadaByDefault
 * Objeto inicial que almacena las opciones seleccionadas por el usuario en el filtro de busqueda avanzada
*/
const filtroBusquedaAvanzadaByDefault = {
    tipo_documento: [],
    anio: [],
    sala_seccion: []
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
 * validarfiltroJurisprudencial()
 * Funcionalidad que verificar si el array del filtro de mapa tiene sus propiedades de tipo array vacias
 * Parametros de entrada:
 * - obj: el objeto que hace referencia a filtroJurisprudencial en el contextProvider
 * Salida:
 * - Retorna true si el objeto filtroJurisprudencial tiene propiedades vacias
 * - Retorna false si alguna de las propiedades del objeto filtroJurisprudencial tiene alguna propiedad con datos
 * Aplicación:
 * - useEffect en listCardSearchMapaResults.js
 * - useEffect en listCardSearchAIResults.js
*/
const validarfiltroJurisprudencial = (obj) => {
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
      nombre_campo: valor[propiedad_1].trim(),
      valor: valor[propiedad_2].trim()
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

/**
 * extraerSpreakerID()
 * Funcionalidad que obtiene el ID de una playlist de Spreaker a partir de una URL dada
 * Parametros de entrada:
 * - cadena: Cadena que contiene la URL de Spreaker
 * Salida:
 * - Retorna un string con el ID del playlist de Spreaker
 * Aplicación:
 * - extraerSpreakerID() en caso.js para obtener el ID que va contenido en el iframe de Spreaker
*/
function extraerSpreakerID(url) {
    // Busca el patrón "--" seguido de cualquier grupo de caracteres al final de la URL
    const match = url.match(/--([a-zA-Z0-9]+)$/);

    // Si encuentra coincidencias, devuelve el grupo capturado
    return match ? match[1] : null;
}

/**
 * obtenerMesEnEspanol()
 * Funcionalidad que obtiene el mes en español a partir de una cadena
 * Parametros de entrada:
 * - cadena: Cadena que contiene una fecha "13 de noviembre de 2022"
 * Salida:
 * - Retorna un string con el nombre del mes, ej. Noviembre
 * Aplicación:
 * - obtenerMesEnEspanol() en caso.js para obtener el mes de una fecha de un hito
*/
function obtenerMesEnEspanol(cadena) {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const cadenaMinuscula = cadena.toLowerCase();
    for (let mes of meses) {
        if (cadenaMinuscula.includes(mes.toLowerCase())) {
            return mes; 
        }
    }
    return null; 
}

/**
 * 
 * Funcion que convierte a fecha en formato cadena a formato YYYY/MM
 */
function obtenerAnioMes(anio, nombreMes) {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const indice = meses.findIndex(mes => mes.toLowerCase() === nombreMes.toLowerCase()) + 1;

    let yyyym = `${anio}/${indice}`;

    return yyyym;
}

/**
 * obtenerAnioDeText()
 * Funcionalidad que obtiene el año tipo YYYY a partir de una cadena
 * Parametros de entrada:
 * - cadena: Cadena que contiene una fecha "13 de noviembre de 2022"
 * Salida:
 * - Retorna un string con el año tipo YYYY, ejemplo 2022
 * Aplicación:
 * - obtenerMesEnEspanol() en caso.js para obtener el año de una fecha de un hito
*/
function obtenerAnioDeTexto(cadena) {
    const regexAnio = /\b(19|20)\d{2}\b/;
    const coincidencia = cadena.match(regexAnio);
    return coincidencia ? coincidencia[0] : null;
}

/**
 * ordenarArrayPorFechaHitos()
 * Funcionalidad que recibe un array de objetos que posee una propiedad fecha y ordena en forma ascendente
 * Parametros de entrada:
 * - arr: Array de objeto que contiene una fecha "13/11/2022"
 * Salida:
 * - Retorna un nuevo array con las fechas en orden ascendente
 * Aplicación:
 * - En caso.js para ordenar los hitos
*/
function ordenarArrayPorFechaHitos(arr){
    let newArr = arr.slice().sort((a, b) => {
        // Divide cada fecha en año y mes
        const [anioA, mesA] = a["fecha"].split("/").map(Number);
        const [anioB, mesB] = b["fecha"].split("/").map(Number);
    
        // Primero compara los años
        if (anioA !== anioB) {
            return anioA - anioB;
        }
    
        // Si los años son iguales, compara los meses
        return mesA - mesB;
    });
    return newArr;
}

/**
 * removeFragmentoInString()
 * Funcionalidad que elimina la palabra "DEPARTAMENTO" partir de una cadena
 * Parametros de entrada:
 * - palabra: Cadena que tiene la palabra a remover. Ej, "DEPARTAMENTO"
 * - cadena: Cadena que contiene DEPARTAMENTO antecedido del nombre del departamento. Ej. "DEPARTAMENTO CÓRDOBA"
 * Salida:
 * - Retorna un string con el nombre del departamento Ej. "CÓRDOBA"
 * Aplicación:
 * - removeString() en filtro de Departamento en mapa_jurisprudencial.js para obtener el departamento
*/
function removeFragmentoInString(palabra, cadena) {
    const regex = new RegExp(`\\b${palabra}\\b`, 'gi');
    return cadena.replace(regex, '').replace(/\s{2,}/g, ' ').trim(); 
}

/* Convierte de formato YYYY-MM-DD a Month Year */
function formatDateToMonthYear(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' };
    let dateFormatted = date.toLocaleString('es-ES', options);
    return capitalizeFirstLetter(dateFormatted); // Cambia 'es-ES' al idioma que necesites
}
/* Capitalize first letter */
function capitalizeFirstLetter(string) {
    if (!string) return ''; // Manejar cadenas vacías
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Genera el listado de opciones de documentos para el autocompletar
const getOpcionesAutocompletar = (arrDatos) => {
    const arrLinted = arrDatos.map(item => item.autocompletarBuscador);
    return [ { "title": "* Todos los resultados", "id": 0 } ].concat(arrLinted);
};

/**
 * getDecisionesIdsToExport()
 * Funcionalidad que obtiene la lista de IDs de decisiones a exportar en Excel
 * Parametros de entrada:
 * - arrDatos: los datos generados a partir del servicio
 * - nombre_campo: el campo que hace referencia al id, Ej. providencia_id
 * Salida:
 * - Retorna una cadena de IDs. Ejemplo: 1001,1002,1004
 * Aplicación:
 * listCardSearchAIResults() 
*/
const getDecisionesIDsToExport = (arrDatos, nombre_campo) => {
    const arrIds = arrDatos.filter(item => item[nombre_campo] !== null).map(item => item[nombre_campo]);
    return arrIds.toString();
};

/**
 * verificaGuardaEnArray()
 * Funcionalidad que almacena un elemento tipo string "Meta" si al verificar dentro del array no existe. Si existe, no lo guarda.
 * Parametros de entrada:
 * - array: Un array simple de lista de departamentos seleccionados ejemplo ["Arauca","Tolima","Cauca"]
 * - elemento: Un elemento a verificar y si en caso de que no exista se agrega al array. Ej. "Meta"
 * Salida:
 * - Retorna un nuevo array de elementos.
 * Aplicación:
 * listCardSearchAIResults() 
*/
const verificaGuardaEnArray = (array, elemento) => array.includes(elemento) ? array : [...array, elemento];

/**
 * getArrayDataGraph()
 * Funcionalidad recibe un objeto de estructura { "2023": 1, "2024": 7, "2025": 1 } y lo convierte a array de objetos para obtener la grafica.
 * Parametros de entrada:
 * - objDataGraph: un objeto de estructura { "2023": 1, "2024": 7, "2025": 1 } Ej. La respuesta dada por el servicio getDetailsGraph() de mapaJurisprudencial
 * Salida:
 * - Retorna un nuevo array de objetos con la estructura: 
   [{
        "name": "2018",
        "fecha": 1254
    },
    {
        "name": "2019",
        "fecha": 3942
    }]
 * Aplicación:
 * Componente section: mapaJurisprudencial()
*/
const getArrayDataGraph = (objDataGraph) => { 
    return Object.entries(objDataGraph).map(([name, fecha]) => ({
        name,
        fecha,
     }));
};

/**
 * convertObjFiltroJurisToQuery()
 * Funcionalidad 
 * Parametros de entrada:
 * - objFiltroJuris: el objeto filtroJuris ejemplo
 {
    "departamentos": [
        "ARAUCA",
        "CAUCA"
    ],
    "anios": [
        "2021",
        "2020",
        "2019"
    ],
    "salas": [
        "S - Sala de Reconocimiento de Verdad, de Responsabilidad y de Determinación de los Hechos y Conductas",
        "T - Sección de Reconocimiento de Verdad y Responsabilidad"
    ],
    "delitos": [
        "CALUMNIA",
        "COHECHO PROPIO"
    ],
    "macrocasos": [
        "Caso 001",
        "Caso 002"
    ],
    "comparecientes": [
        "FARC-EP",
        "TERCERO CIVIL"
    ],
    "procedimientos": [
        "ACCIÓN DE TUTELA",
        "PRECLUSIÓN"
    ]
}
 * Salida:
 * - Retorna un string para enviar como parametro de consulta en mapaJurisprudencialService.getDetailsGraph() ejemplo: "anio_hecho=2019,2020&dpto=DEPARTAMENTO+CAUCA,DEPARTAMENTO+TOLIMA"
 * Aplicación:
 * Componente section: mapaJurisprudencial()
*/
const convertObjFiltroJurisToQuery = (objFiltroJuris) => {
    let newObjFiltroJuris = {};
    let strFiltroJuris = "";
    for (let propiedad in objFiltroJuris) {
        if (Array.isArray(objFiltroJuris[propiedad]) && objFiltroJuris[propiedad].length > 0) {
            switch(propiedad){
                case "departamentos":
                    let arrDptos = objFiltroJuris[propiedad].map((item)=>{
                        return `DEPARTAMENTO ${item}`;
                    });
                    newObjFiltroJuris["dpto"] = arrDptos.join(",");
                    strFiltroJuris = strFiltroJuris.concat(`dpto=${newObjFiltroJuris["dpto"]}&`);
                break;
                case "anios":
                    newObjFiltroJuris["anio_hecho"] = objFiltroJuris[propiedad].toString();
                    strFiltroJuris = strFiltroJuris.concat(`anio_hecho=${newObjFiltroJuris["anio_hecho"]}&`);
                break;
                case "salas":
                    let arrSalas = objFiltroJuris[propiedad].map((sala)=>{
                         let salaSeccion = datos_sala_seccion.find(item => item["valor"] === sala );
                         return salaSeccion["id"];
                    });
                    newObjFiltroJuris["sala_seccion"] = arrSalas.toString();
                    strFiltroJuris = strFiltroJuris.concat(`sala_seccion=${newObjFiltroJuris["sala_seccion"]}&`);
                break;
                case "delitos":
                    newObjFiltroJuris["delito"] = objFiltroJuris[propiedad].join(",");
                    strFiltroJuris = strFiltroJuris.concat(`delito=${newObjFiltroJuris["delito"]}&`);
                break;
                case "macrocasos":
                    newObjFiltroJuris["macrocaso"] = objFiltroJuris[propiedad].join(",");
                    strFiltroJuris = strFiltroJuris.concat(`macrocaso=${newObjFiltroJuris["macrocaso"]}&`);
                break;
                case "comparecientes":
                    newObjFiltroJuris["tipo_compa"] = objFiltroJuris[propiedad].join(",");
                    strFiltroJuris = strFiltroJuris.concat(`tipo_compa=${newObjFiltroJuris["tipo_compa"]}&`);
                break;
                case "procedimientos":
                    newObjFiltroJuris["procedimiento"] = objFiltroJuris[propiedad].join(",");
                    strFiltroJuris = strFiltroJuris.concat(`procedimiento=${newObjFiltroJuris["procedimiento"]}&`);
                break;
                default:
                break;
            }
        }
    }
    strFiltroJuris = strFiltroJuris.length > 0 ? strFiltroJuris.slice(0, -1) : strFiltroJuris;
    return strFiltroJuris;
        
}

/**
 * ordenarTerminosABCD()
 * Funcionalidad que obtiene la lista de terminos ordenados alfabeticamente
 * Parametros de entrada:
 * - arr: los datos generados a partir del servicio
 * Salida:
 * - Retorna un nuevo array de terms ordenados alfabeticamente
 * Aplicación:
 * tesauro.js servicio
*/

const ordenarTerminosABCD = (arr) => {
    return arr.sort((a, b) => {
        const valorA = typeof a === "string" ? a : a.nombreReal;
        const valorB = typeof b === "string" ? b : b.nombreReal;
        return valorA.localeCompare(valorB, 'es', { sensitivity: 'base' });
    });
}

/**
 * ordenarBoletinesActuales()
 * Funcionalidad que obtiene la lista de boletines ordenados por fecha anioMes de mayor a menor
 * Parametros de entrada:
 * - arr: el array de objetos de boletines
 * Salida:
 * - Retorna un nuevo array de boletines ordenados por fecha    
 * Aplicación:
 * carousel.js componente
*/

const ordenarBoletinesActuales = (arr) => {

    let boletinesOrdenados = [...arr].sort((a, b) => {
        const valorA = typeof a === "string" ? a : new Date(a.anioMes);
        const valorB = typeof b === "string" ? b : new Date(b.anioMes);
        return valorB - valorA;
    });
        
    let boletinesAnio = [...boletinesOrdenados].filter( boletin => boletin.fecha ===  String(new Date().getFullYear()) )
    
    if(boletinesAnio.length > 0 ){
        boletinesOrdenados = [...boletinesAnio];
    }

    return boletinesOrdenados;
  }
  
/**
 * sanitizeString()
 * Funcionalidad que convierte una cadena de texto formateandola a HTML
 * Parametros de entrada:
 * - str: cadena con etiquetas HTML
 * Salida:
 * - Retorna en formato HTML   
 * Aplicación:
 * CardSearchResults componente
*/

const sanitizeString = (str) => {
    
    let newStr  = DOMPurify.sanitize(str);
    
    // Validando strings HTML de tipo <p>null</p>
    if((newStr.trim() === "") || (newStr === null) || (newStr === "null")){
        return "";
    } 
    
    return newStr;
    
};

/**
 * setLocalStorageWithExpiry()
 * Funcionalidad que guarda en localStorage con expiración
 * Parametros de entrada:
 * - key: nombre variable localStorage
 * - value: valor de la variable localStorage
 * - ttl: tiempo de expiracion de la variable localStorage dada en milisegundos, ej. 180000; // 3 minutos en milisegundos
 * Salida:
 * - Crea una nueva variable en localStorage de tipo objeto {value: "", expiry: ""}
 * Aplicación:
 * - resultadosBusqueda.js
*/
const setLocalStorageWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};
  
/**
 * getLocalStorageWithExpiry()
 * Funcionalidad que obtiene el valor de una variable en localStorage de la cual en caso de que expire sea automaticamente eliminada
 * Parametros de entrada:
 * - key: nombre variable localStorage
 * Salida:
 * - Obtiene el valor de la variable en caso de que no haya expirado
 * Aplicación:
 * - resultadosBusqueda.js
*/

const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    /*if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }*/
    return item.value;
};

/**
 * formatHighlight()
 * Funcionalidad que estructura los datos provenientes de item.highlight a extracto busqueda
 * Parametros de entrada:
 * - highlight: campo highlight
 * Salida:
 * - Obtiene una cadena concatenada del highlight
 * Aplicación:
 * - resultadosBusqueda.js
*/

const formatHighlight = (highlight) => {
    
    let newExtractoBusqueda = "";
    
    if(highlight !== null){
    
        newExtractoBusqueda = "<p>";
    
        const highlightProperties = ["sintesis", "hechos_antecedentes", "conclusion_resuelve"];
    
        highlightProperties.forEach((property, index) => {
            if(highlight.hasOwnProperty(property)){
                for(const i of highlight[property]){
                    newExtractoBusqueda += i + "</br></br>";    
                }
            }
        });
    
        newExtractoBusqueda += "</p>"; 
    }
    
    if(newExtractoBusqueda === "<p></p>"){
        newExtractoBusqueda = "";
    }
    
    return newExtractoBusqueda;
};

/**
 * validateSearchParamsVTD()
 * Funcionalidad que valida los datos de un objeto de tipo searchParams provenientes de React Router. Si el objeto no esta vacio y contiene alguna de las propiedades retorna True.
 * Parametros de entrada:
 * - searchParamsObj: el objeto searchParams proveniente de React Router
 * Salida:
 * - Obtiene un valor de tipo boolean true o false. True en caso de que el objeto no contenga propiedades vacias
 * Aplicación:
 * - verTodasLasDecisiones.js
*/

const validateSearchParamsVTD = (searchParamsObj) => { 
    return ((Object.values(searchParamsObj).some(value => value !== null || value !== undefined || value !== "")) && 
    ( searchParamsObj.hasOwnProperty('string') && 
      searchParamsObj.hasOwnProperty('procedimiento') &&   
      searchParamsObj.hasOwnProperty('sala_seccion') &&
      searchParamsObj.hasOwnProperty('anio_hechos') &&
      searchParamsObj.hasOwnProperty('delito') &&   
      searchParamsObj.hasOwnProperty('dpto') &&
      searchParamsObj.hasOwnProperty('macrocaso') &&
      searchParamsObj.hasOwnProperty('tipo_compareciente') 
    ));
}

/**
 * createSearchParamsObject()
 * Funcionalidad que crea un objeto de tipo searchParams recibiendo como parametro string y parametro filtroJurisprudencial
 * Parametros de entrada:
 * - filtroJurisprudencial: el objeto que contiene los filtros de busqueda
 * - stringInnerQuery: el string de busqueda 
 * Salida:
 * - Obtiene un objeto de tipo searchParams para enviar como parametro al servicio de busqueda
 * Aplicación:
 * - src/components/listCardSearchVTDResults.js
*/

const createSearchParamsObj = (filtroJurisprudencial, stringInnerQuery) => { 

     let filtroJurisprudencialDepartamentos = filtroJurisprudencial.departamentos.map((item)=>{
        return `DEPARTAMENTO ${item}`;
     });
    
    let newObj = { string: stringInnerQuery.trim(), 
        procedimiento: filtroJurisprudencial.procedimientos.join("|"),
        sala_seccion: filtroJurisprudencial.salas.join("|"), 
        anio_hechos: filtroJurisprudencial.anios.join("|"), 
        delito: filtroJurisprudencial.delitos.join("|"), 
        dpto: filtroJurisprudencialDepartamentos.join("|"), 
        macrocaso: filtroJurisprudencial.macrocasos.join("|"),
        tipo_compareciente: filtroJurisprudencial.comparecientes.join("|")
    };
    
    return newObj;
}

/**
 * createSelectedFiltersVTD()
 * Funcionalidad que crea un objeto de filtroJurisprudencialVTD recibiendo como parametro un objeto de tipo searchParams
 * Parametros de entrada:
 * - searchParamsObj: el objeto que contiene los filtros de busqueda
 * Salida:
 * - Obtiene un objeto de tipo filtroJurisprudencial para luego ser actualizado en el contextProvider
 * Aplicación:
 * - src/sections/verTodasLasDecisiones.js
*/

const createSelectedFiltersVTD = (searchParamsObj) => { 

    let dptos = searchParamsObj["dpto"].split("|");
    dptos = dptos.map((item)=> {
        return item.replace("DEPARTAMENTO ", "");
    });
   
let newObj = { 
      departamentos: (searchParamsObj["dpto"].length > 0) ? dptos : [],
      anios:  (searchParamsObj["anio_hechos"].length > 0) ? searchParamsObj["anio_hechos"].split("|") : [],
      salas:  (searchParamsObj["sala_seccion"].length > 0) ? searchParamsObj["sala_seccion"].split("|") : [],
      delitos:  (searchParamsObj["delito"].length > 0) ? searchParamsObj["delito"].split("|") : [],
      macrocasos:  (searchParamsObj["macrocaso"].length > 0) ? searchParamsObj["macrocaso"].split("|") : [],
      comparecientes:  (searchParamsObj["tipo_compareciente"].length > 0) ? searchParamsObj["tipo_compareciente"].split("|") : [],
      procedimientos:  (searchParamsObj["procedimiento"].length > 0) ? searchParamsObj["procedimiento"].split("|") : [],
};
   
   //console.log("Crea a partir de createSelectedFiltersVTD", newObj)
   
   return newObj;
}

/**
 * validateSearchParamsBusquedaAV()
 * Funcionalidad que valida los datos de un objeto de tipo searchParams provenientes de React Router desde busqueda avanzada. Si el objeto no esta vacio y contiene alguna de las propiedades retorna True.
 * Parametros de entrada:
 * - searchParamsObj: el objeto searchParams proveniente de React Router
 * Salida:
 * - Obtiene un valor de tipo boolean true o false. True en caso de que el objeto no contenga propiedades vacias
 * Aplicación:
 * - resultadosBusqueda.js
*/

const validateSearchParamsBusquedaAV = (searchParamsObj) => { 
    let valor = ((Object.values(searchParamsObj).some(value => value !== null || value !== undefined || value !== "")) && 
    (   searchParamsObj.hasOwnProperty('advanced_search') && 
        searchParamsObj.hasOwnProperty('alguna_palabra') &&
        searchParamsObj.hasOwnProperty('anio') &&
        searchParamsObj.hasOwnProperty('frase_exacta') &&
        searchParamsObj.hasOwnProperty('ninguna_palabra') &&
        searchParamsObj.hasOwnProperty('sala_seccion') &&
        searchParamsObj.hasOwnProperty('tipo_documento') &&   
        searchParamsObj.hasOwnProperty('todas_palabras')   
    ));
    return valor;
}

export { filtroByDefault, 
         filtroBusquedaAvanzadaByDefault,
         truncateWithEllipsis, 
         obtenerAnio, 
         obtenerPalabrasFromArrayObject, 
         validarfiltroJurisprudencial, 
         generarArrayDeObjetosNombreCampoValor,
         getParametroDeUrl,
         extraerSpreakerID,
         obtenerMesEnEspanol,
         obtenerAnioDeTexto,
         removeFragmentoInString,
         formatDateToMonthYear,
         getOpcionesAutocompletar,
         obtenerAnioMes,
         ordenarArrayPorFechaHitos,
         getDecisionesIDsToExport,
         verificaGuardaEnArray,
         getArrayDataGraph,
         convertObjFiltroJurisToQuery,
         ordenarTerminosABCD,
         ordenarBoletinesActuales,
         sanitizeString,
         setLocalStorageWithExpiry,
         getLocalStorageWithExpiry,
         formatHighlight,
         validateSearchParamsVTD,
         createSearchParamsObj,
         createSelectedFiltersVTD,
         validateSearchParamsBusquedaAV 
};