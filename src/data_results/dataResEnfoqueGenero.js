import DOMPurify from 'dompurify';
import { removeFragmentoInString, obtenerPalabrasFromArrayObject, sanitizeString, obtenerAnio } from '../helpers/utils.js';

const dataResults = (data) => { 
    const newDatos = data.map((i, k) => { 
        let item = i;
                        let newItem = {
                            id: k + 1,
                            fecha: item.fecha_providencia,
                            ficha_id: item.id,
                            providencia_id: ((item.getfichas.length > 0 ) && (item.getfichas[0].id !== null))  ?  item.getfichas[0].id : "",
                            sala: (item.despacho) ? item.despacho.nombre : "",
                            salaOSeccion: (item.despacho) ? item.despacho.nombre : "",
                            nombreDecision: ((item.nombre !== null)) ? item.nombre : "",
                            procedimiento: (item.hasOwnProperty("actuacion")) && (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, false) : "", 
                            expediente: "",
                            departamento: (item.departamento_ext.length > 0) ? removeFragmentoInString("DEPARTAMENTO", item.departamento_ext[0].nombre_dpto) : "",
                            magistrado: (item.magistrado.length > 0) ? obtenerPalabrasFromArrayObject(item.magistrado, "nombre_magistrado", "nombre", false) : "", //Requiere nombre
                            municipio:  (item.municipio_ext.length > 0) ? removeFragmentoInString("MUNICIPIO", item.municipio_ext[0].nombre_muni) : "",
                            delito: (item.delitos.length > 0) ? obtenerPalabrasFromArrayObject(item.delitos, "delito", null, false) : "", 
                            anioHechos: (item.anio_hechos.length > 0) ? item.anio_hechos[0].anio : "",
                            anioProvidencia: (item.fecha_providencia !== null ) ? obtenerAnio(item.fecha_providencia) : "",
                            tipo: (item.documento.length > 0) ? obtenerPalabrasFromArrayObject(item.documento, "nombre", null, false) : "", 
                            radicado: (item.radicado !== null) ? item.radicado : "",
                            compareciente:  ((item.getfichas.length > 0 ) && (item.getfichas[0].compareciente !== null))  ?  item.getfichas[0].compareciente : "", 
                            tipoSujeto: (item.tipopeti.length > 0) ? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "", 
                            accionadoVinculado: (item.hasOwnProperty("accionadoVinculado") && (item.accionadoVinculado !== null )) ? item.accionadoVinculado : "",
                            palabrasClaves:  (item.getfichas.length > 0 )? obtenerPalabrasFromArrayObject(item.getfichas[0].palabras_clave_problemas_juridicos, "palabras", null, false) : "", 
                            hechos:  (item.hasOwnProperty("hechos_antecedentes") && (item.hechos_antecedentes !== null)) ? item.hechos_antecedentes : "", 
                            problemasJuridicos: ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_descripcion !== null))  ?  item.getfichas[0].sintesis_descripcion : "",
                            reglas: (item.hasOwnProperty("reglas_juridicas") && (item.reglas_juridicas !== null)) ? item.reglas_juridicas : "",
                            aplicacionCasoConcreto: (item.hasOwnProperty("analisis_caso_concreto") && (item.analisis_caso_concreto !== null)) ? item.analisis_caso_concreto : "", 
                            resuelve:  (item.hasOwnProperty("resuelve") && (item.resuelve !== null )) ? item.resuelve : "",
                            documentosAsociados: (item.hasOwnProperty("anexos") && (item.anexos.length > 0)) ? item.anexos[0].nombre : "", 
                            documentosAsociadosLink:  (item.hasOwnProperty("anexos") && (item.anexos.length > 0)) ? item.anexos[0].hipervinculo : "", 
                            enfoquesDiferenciales: (item.hasOwnProperty("enfoque") && (item.enfoque !== null )) ? item.enfoque : "",
                            notasRelatoria: "", 
                            hipervinculo:   (item.hipervinculo !== null ) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.hipervinculo}` : "", 
                            hipervinculoFichaJuris: "",
                            estadoFichaJuris: false,
                            extractoBusqueda:  ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_titulo !== null))  ?  sanitizeString(item.getfichas[0].sintesis_titulo) : "",
                            caso: (item.casopro.length > 0 ) ? obtenerPalabrasFromArrayObject(item.casopro, "caso", null, false) : "",
                            autocompletarBuscador: "",
                            estado_id: ((item.getfichas.length > 0 ) && (item.getfichas[0].estado_id !== null))  ?  item.getfichas[0].estado_id : "",
                            conclusion_resuelve: ((item.conclusion_resuelve !== null) && (item.hasOwnProperty("conclusion_resuelve"))) ? item.conclusion_resuelve : "", 
                            analisis: ((item.getfichas.length > 0 ) && (item.getfichas[0].sintesis_titulo !== null))  ?  sanitizeString(item.getfichas[0].sintesis_titulo) : "",
                        };
                        newItem["departamentoNombre"] = newItem.departamento;
                        newItem["procedimientos"] = newItem.procedimiento; 
                        newItem["anio"] = newItem.anioProvidencia; 
                        newItem["comparecientes"] = newItem.tipoSujeto;
                        newItem["delitos"] = newItem.delito;
                        newItem["hechos"] =  DOMPurify.sanitize(newItem.analisis, { ALLOWED_TAGS: [] });
                        newItem["hipervinculoFichaJuris"] = ((newItem.providencia_id !== null) && ( newItem.estado_id === 14 )) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadfichaext/${newItem.providencia_id}` : " ";
                        newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.salaOSeccion} ${newItem.nombreDecision} ${newItem.departamento} ${newItem.delito} ${newItem.procedimiento} ${newItem.compareciente} ${newItem.magistrado}`};  
                        return newItem;
  });
  return newDatos;
};

export default dataResults;