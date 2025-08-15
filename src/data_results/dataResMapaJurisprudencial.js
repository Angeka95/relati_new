import { obtenerAnio, truncateWithEllipsis, obtenerPalabrasFromArrayObject, removeFragmentoInString } from './../helpers/utils.js';

const dataResults = (data) => { 
    const newDatos = data.map((i, k) => { 
        let item = i;
        let newItem = {
            id: item.id,
            providencia_id: item.id,
            fecha: item.fecha_providencia,
            anio: obtenerAnio(item.fecha_providencia),
            asuntoNombreCaso: "",
            asuntoCasoEllipsed: ((item.nombre !== null)) ? truncateWithEllipsis(item.asuntocaso) : "", 
            asuntoNombre: ((item.nombre !== null)) ? item.nombre : "",
            nombre: ((item.nombre !== null)) ? item.nombre : "",
            actuacion: obtenerPalabrasFromArrayObject(item.actuacion),
            caso:  ((item.caso !== null)) ? item.caso : "",
            sala: ((item.despacho !== null) && item.despacho.hasOwnProperty("nombre")) ? item.despacho.nombre : "",
            salaDescripcion:  ((item.despacho !== null) && item.despacho.hasOwnProperty("descripcion")) ? item.despacho.descripcion : "",
            salaId:  ((item.despacho !== null) && item.despacho.hasOwnProperty("id")) ? item.despacho.id : "",
            asuntoCaso: (item.asuntocaso !== null) ? item.asuntocaso : "",
            departamentoId: (item.departamento_ext.length > 0) ? item.departamento_ext[0].id : "",
            providencia: (item.departamento_ext.length > 0) ? item.departamento_ext[0].providencia_id : "",
            departamentoNombre: removeFragmentoInString("DEPARTAMENTO", item.departamento_ext[0].nombre_dpto),
            hipervinculo:   (item.hipervinculo !== null ) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.hipervinculo}` : "",
            comparecientes: (item.hasOwnProperty("tipopeti")) && (item.tipopeti.length > 0 )? obtenerPalabrasFromArrayObject(item.tipopeti, "tipo", null, false) : "",
            delitos: (item.hasOwnProperty("delitos")) && (item.delitos.length > 0 )? obtenerPalabrasFromArrayObject(item.delitos, "delito", null, false) : "",
            procedimientos: (item.hasOwnProperty("actuacion")) && (item.actuacion.length > 0 )? obtenerPalabrasFromArrayObject(item.actuacion, "actuacion", null, false) : "",
            palabrasClave: "",
            municipio: "",
            palabrasClaveBuscador: "",
            palabrasClaveFichaJuridica: (item.getfichas.length > 0) ? obtenerPalabrasFromArrayObject(item.getfichas, "palabras_clave_problemas_juridicos", "palabras", false): ""
        };
        newItem["asuntoNombreCaso"] = `${item.asuntocaso} ${item.nombre}`;
        newItem["palabrasClave"] = `${newItem["delitos"]}, ${newItem["comparecientes"]}, ${newItem["procedimientos"]}`;
        newItem["hipervinculoFichaJuris"] = ((item.getfichas.length > 0) && (item.getfichas[0].id !== null ) && ( item.getfichas[0].estado_id === 14 )) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadfichaext/${item.getfichas[0].id}` : " ";
        newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.sala} ${newItem.departamentoNombre} ${newItem.asuntoNombre} ${newItem.palabrasClave}`};
        return newItem;
  });
  return newDatos;
};

export default dataResults;

