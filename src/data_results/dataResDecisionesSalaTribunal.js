import DOMPurify from 'dompurify';
import {  obtenerPalabrasFromArrayObject, sanitizeString } from './../helpers/utils.js';

const dataResults = (data) => {
console.log("dataResults", data[0]);
const newArray = data.map((i, k) => {
    let item = i._source;
    let newItem = {
            id: item.id,
            providencia_id: item.id,
            fecha: item.fecha_providencia,
            asunto: item.asuntocaso,
            salaOSeccion: item.despacho.nombre,
            nombreDecision: item.nombre,
            procedimiento: (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, true) : "",
            expediente: (item.orfeo !== null ) ? item.orfeo : "",
            departamento: (item.departamento_ext.length > 0 )? obtenerPalabrasFromArrayObject(item.departamento_ext, "nombre_dpto") : "",
            magistrado: (item.magistrado.length > 0 )? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "", 
            municipio: (item.municipio_ext.length > 0 )? obtenerPalabrasFromArrayObject(item.municipio_ext, "nombre_muni", null, false) : "", 
            delito: (item.delitos.length > 0 )?  obtenerPalabrasFromArrayObject(item.delitos, "delito") : "", 
            anioHechos: (item.anio_hechos.length > 0 )? obtenerPalabrasFromArrayObject(item.anio_hechos, "anio") : "", 
            tipo: (item.documento !== null ) ?  `${item.documento.nombre}` : "",
            radicado: (item.radicado.length !== null ) ? item.radicado : "",
            compareciente: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas, "compareciente", null, false) : "", 
            tipoSujeto: (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "",
            accionadoVinculado: (item.accionado.length > 0 )? obtenerPalabrasFromArrayObject(item.accionado, "accionado", null, false): "",  
            palabrasClaves:  (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "",
            hechos: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "hechos", null, false) : "",
            problemasJuridicos: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "", 
            reglas: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "reglas", null, false) : "",
            aplicacionCasoConcreto: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].problemas_juridicos, "tesisjurisprudencial", null, false) : "",
            resuelve: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].resuelve, "descripcion", null, false) : "",
            documentosAsociados:  (item.providencia_votos.length > 0 )? obtenerPalabrasFromArrayObject(item.providencia_votos, "nombre", null, false): "", 
            enfoquesDiferenciales: (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].enfoques_diferenciales, "nombre_enfoque", null, false): "", 
            notasRelatoria: ((item.getfichas.length > 0 ) && (item.getfichas[0].hasOwnProperty("notas"))) ? item.getfichas[0].notas : "", 
            hipervinculo:  (item.hipervinculo !== "" ) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.hipervinculo}` : "", 
            hipervinculoFichaJuris: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id === 14)) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadfichaext/${item.getfichas[0].id}` : "",
            estadoFichaJuris: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id !== null))  ?  item.getfichas[0].estado_id : "",
            tipoDecision: (item.detalle_caso !== null ) ? `${item.detalle_caso}` : "",
            caso: (item.caso !== null ) ? item.caso : "",
            subcaso: (item.casopro.length > 0 ) ? obtenerPalabrasFromArrayObject(item.casopro, "caso", null, false) : "",
            extractoBusqueda: ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_descripcion !== null))  ?  sanitizeString(item.getfichas[0].sintesis_descripcion) : "",
            conclusion_resuelve: ((item.conclusion_resuelve !== null) && (item.hasOwnProperty("conclusion_resuelve"))) ? item.conclusion_resuelve : "",
            // anexos: (item.anexos.length > 0) ? item.anexos : "",
            //recursos: (item.recursos.length > 0) ? item.recursos : ""
        };
        newItem["hechos"] =  DOMPurify.sanitize(newItem.hechos, { ALLOWED_TAGS: [] });
        newItem["extractoBusqueda"] =  DOMPurify.sanitize(newItem.extractoBusqueda, { ALLOWED_TAGS: [] });
        newItem["comparecientes"] = newItem.tipoSujeto;
        newItem["problemasJuridicos"] =  DOMPurify.sanitize(newItem.problemasJuridicos, { ALLOWED_TAGS: [] });
        newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.salaOSeccion} ${newItem.delito} ${newItem.procedimiento} ${newItem.compareciente} ${newItem.tipoSujeto} ${newItem.departamento} ${newItem.nombreDecision} ${newItem.magistrado}  ${newItem.palabrasClaves}`}; 
        return newItem;
    });
    return newArray;
};

export default dataResults;