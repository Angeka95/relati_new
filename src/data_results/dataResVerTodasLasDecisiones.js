import { sanitizeString } from '../helpers/utils.js';

const dataResults = (data) => { 
    const newDatos = data.map((i, k) => { 
        let item = i._source;
        let newItem = {
            id: k + 1,
            score: i._score,
            fecha: item.fecha_documento,
            ficha_id: item.ficha_id,
            providencia_id: item.providencia_id,
            sala: (item.sala_seccion !== null) ? item.sala_seccion : "",
            salaOSeccion: (item.sala_seccion !== null) ? item.sala_seccion : "",
            nombreDecision: (item.nombre_providencia !== null) ? item.nombre_providencia : "",
            procedimiento: (item.procedimiento !== null ) ? item.procedimiento : "",
            expediente: (item.expediente !== null) ? item.expediente : "", 
            departamento: (item.departamento !== null ) ? item.departamento : "",
            magistrado: (item.autor !== null) ? item.autor : "", 
            municipio:  (item.municipio !== null ) ? item.municipio : "",
            delito: (item.delito !== null ) ? item.delito : "",
            anioHechos: (item.anio_hechos !== null ) ? item.anio_hechos : "",
            tipo: (item.tipo_documento !== null) ? item.tipo_documento : "", 
            radicado: (item.radicado_documento !== null) ? item.radicado_documento : "",
            compareciente: (item.compareciente !== null ) ? item.compareciente : "",
            tipoSujeto: (item.tipo_compareciente !== null ) ? item.tipo_compareciente : "",
            accionadoVinculado: (item.accionadoVinculado !== null ) ? item.accionadoVinculado : "",
            palabrasClaves: (item.palabras_clave !== null ) ? item.palabras_clave : "",
            hechos: (item.hechos_antecedentes !== null) ? item.hechos_antecedentes : "", 
            problemasJuridicos: (item.problema_juridico !== null) ? item.problema_juridico : "",
            reglas: (item.reglas_juridicas !== null) ? item.reglas_juridicas : "",
            aplicacionCasoConcreto: (item.analisis_caso_concreto !== null) ? item.analisis_caso_concreto : "", 
            resuelve:  (item.resuelve !== null ) ? item.resuelve : "",
            documentosAsociados: (item.anexos.length > 0) ? item.anexos[0].nombre : "", 
            documentosAsociadosLink:  (item.anexos.length > 0) ? item.anexos[0].hipervinculo : "", 
            enfoquesDiferenciales: (item.enfoque !== null ) ? item.enfoque : "",
            notasRelatoria: "", 
            hipervinculo:   (item.hipervinculo !== null ) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/${item.hipervinculo}` : "", 
            hipervinculoFichaJuris: "",
            estadoFichaJuris: false,
            extractoBusqueda: (item.sintesis !== null ) ? sanitizeString(item.sintesis) : "",
            caso: (item.macrocaso !== null ) ? item.macrocaso : "",
            autocompletarBuscador: "",
            estado_id: (item.estado_id > 0) ? item.estado_id : "",
            conclusion_resuelve: (item.conclusion_resuelve !== null) ? item.conclusion_resuelve : "", 
        };
        newItem["departamentoNombre"] = newItem.departamento;
        newItem["procedimientos"] = newItem.procedimiento; 
        newItem["anio"] = newItem.anioHechos;
        newItem["comparecientes"] = newItem.tipoSujeto;
        newItem["delitos"] = newItem.delito;
        newItem["hipervinculoFichaJuris"] = ((newItem.ficha_id !== null ) && ( newItem.estado_id === 14 )) ? `${process.env.REACT_APP_API_SERVER_DOMAIN}/downloadfichaext/${newItem.ficha_id}` : " ";
        newItem["autocompletarBuscador"] = { id: newItem.id, title: `${newItem.salaOSeccion} ${newItem.nombreDecision} ${newItem.departamento} ${newItem.delito} ${newItem.procedimiento} ${newItem.compareciente} ${newItem.magistrado}`};  
        return newItem;
  });
  return newDatos;
};

export default dataResults;