const delitos = [
        {
            "nombre_campo": "ACTOS DE PROMOCIÓN Y AUSPICIO DE GRUPOS ARMADOS AL MARGEN DE LA LEY",
            "valor": "ACTOS DE PROMOCIÓN Y AUSPICIO DE GRUPOS ARMADOS AL MARGEN DE LA LEY"
        },
        {
            "nombre_campo": "APOLOGÍA AL GENOCIDIO",
            "valor": "APOLOGÍA AL GENOCIDIO"
        },
        {
            "nombre_campo": "ATENTADOS CONTRA LA DIGNIDAD PERSONAL (C.G)",
            "valor": "ATENTADOS CONTRA LA DIGNIDAD PERSONAL (C.G)"
        },
        {
            "nombre_campo": "CALUMNIA",
            "valor": "CALUMNIA"
        },
        {
            "nombre_campo": "CAPTACIÓN MASIVA Y HABITUAL DE DINEROS",
            "valor": "CAPTACIÓN MASIVA Y HABITUAL DE DINEROS"
        },
        {
            "nombre_campo": "CIRCULACIÓN ILEGAL DE MONEDAS",
            "valor": "CIRCULACIÓN ILEGAL DE MONEDAS"
        },
        {
            "nombre_campo": "CIRCULACIÓN Y USO DE EFECTO OFICIAL O SELLO FALSIFICADO",
            "valor": "CIRCULACIÓN Y USO DE EFECTO OFICIAL O SELLO FALSIFICADO"
        },
        {
            "nombre_campo": "COHECHO IMPROPIO",
            "valor": "COHECHO IMPROPIO"
        },
        {
            "nombre_campo": "COHECHO POR DAR U OFRECER",
            "valor": "COHECHO POR DAR U OFRECER"
        },
        {
            "nombre_campo": "COHECHO PROPIO",
            "valor": "COHECHO PROPIO"
        },
        {
            "nombre_campo": "CONCIERTO PARA DELINQUIR",
            "valor": "CONCIERTO PARA DELINQUIR"
        },
        {
            "nombre_campo": "CONCUSIÓN",
            "valor": "CONCUSIÓN"
        },
        {
            "nombre_campo": "CONDENAS DICTADAS Y EJECUCIONES SIN PREVIO JUICIO ANTE UN TRIBUNAL REGULARMENTE CONSTITUIDO, CON TODAS LAS GARANTÍAS JUDICIALES GENERALMENTE RECONOCIDAS COMO INDISPENSABLES (C.G)",
            "valor": "CONDENAS DICTADAS Y EJECUCIONES SIN PREVIO JUICIO ANTE UN TRIBUNAL REGULARMENTE CONSTITUIDO, CON TODAS LAS GARANTÍAS JUDICIALES GENERALMENTE RECONOCIDAS COMO INDISPENSABLES (C.G)"
        },
        {
            "nombre_campo": "CONDUCTAS PUNIBLES DE EJECUCIÓN PERMANENTE",
            "valor": "CONDUCTAS PUNIBLES DE EJECUCIÓN PERMANENTE"
        },
        {
            "nombre_campo": "CONSERVACIÓN O FINANCIACIÓN DE PLANTACIONES",
            "valor": "CONSERVACIÓN O FINANCIACIÓN DE PLANTACIONES"
        },
        {
            "nombre_campo": "CONSPIRACIÓN",
            "valor": "CONSPIRACIÓN"
        },
        {
            "nombre_campo": "CONSTREÑIMIENTO A APOYO BÉLICO",
            "valor": "CONSTREÑIMIENTO A APOYO BÉLICO"
        },
        {
            "nombre_campo": "CONSTREÑIMIENTO A LA PROSTITUCIÓN",
            "valor": "CONSTREÑIMIENTO A LA PROSTITUCIÓN"
        },
        {
            "nombre_campo": "CONSTREÑIMIENTO AL SUFRAGANTE",
            "valor": "CONSTREÑIMIENTO AL SUFRAGANTE"
        },
        {
            "nombre_campo": "CONSTREÑIMIENTO ILEGAL",
            "valor": "CONSTREÑIMIENTO ILEGAL"
        },
        {
            "nombre_campo": "CONSTREÑIMIENTO PARA DELINQUIR",
            "valor": "CONSTREÑIMIENTO PARA DELINQUIR"
        },
        {
            "nombre_campo": "CONTAMINACIÓN AMBIENTAL",
            "valor": "CONTAMINACIÓN AMBIENTAL"
        },
        {
            "nombre_campo": "CONTAMINACIÓN AMBIENTAL CULPOSA POR EXPLOTACIÓN DE YACIMIENTO MINERO O HIDROCARBURO",
            "valor": "CONTAMINACIÓN AMBIENTAL CULPOSA POR EXPLOTACIÓN DE YACIMIENTO MINERO O HIDROCARBURO"
        },
        {
            "nombre_campo": "CONTAMINACIÓN DE AGUAS",
            "valor": "CONTAMINACIÓN DE AGUAS"
        },
        {
            "nombre_campo": "CONTRABANDO",
            "valor": "CONTRABANDO"
        },
        {
            "nombre_campo": "CONTRABANDO DE HIDROCARBUROS Y SUS DERIVADOS",
            "valor": "CONTRABANDO DE HIDROCARBUROS Y SUS DERIVADOS"
        },
        {
            "nombre_campo": "CONTRATO SIN CUMPLIMIENTO DE REQUISITOS LEGALES",
            "valor": "CONTRATO SIN CUMPLIMIENTO DE REQUISITOS LEGALES"
        },
        {
            "nombre_campo": "CORRUPCIÓN DE ALIMENTOS, PRODUCTOS MÉDICOS O MATERIAL PROFILÁCTICO",
            "valor": "CORRUPCIÓN DE ALIMENTOS, PRODUCTOS MÉDICOS O MATERIAL PROFILÁCTICO"
        },
        {
            "nombre_campo": "CORRUPCIÓN DE SUFRAGANTE",
            "valor": "CORRUPCIÓN DE SUFRAGANTE"
        },
        {
            "nombre_campo": "CORRUPCIÓN PRIVADA",
            "valor": "CORRUPCIÓN PRIVADA"
        },
        {
            "nombre_campo": "CRIMEN DE APARTHEID (L.H)",
            "valor": "CRIMEN DE APARTHEID (L.H)"
        },
        {
            "nombre_campo": "CRÍMENES COMETIDOS POR PREJUICIO, ODIO Y DISCRIMINACIÓN DE GÉNERO, SEXO, IDENTIDAD Y ORIENTACIÓN SEXUAL DIVERSA EN EL MARCO DEL CONFLICTO ARMADO",
            "valor": "CRÍMENES COMETIDOS POR PREJUICIO, ODIO Y DISCRIMINACIÓN DE GÉNERO, SEXO, IDENTIDAD Y ORIENTACIÓN SEXUAL DIVERSA EN EL MARCO DEL CONFLICTO ARMADO"
        },
        {
            "nombre_campo": "CRÍMENES INTERNACIONALES",
            "valor": "CRÍMENES INTERNACIONALES"
        },
        {
            "nombre_campo": "DAÑO EN BIEN AJENO",
            "valor": "DAÑO EN BIEN AJENO"
        },
        {
            "nombre_campo": "DAÑO EN MATERIA PRIMA, PRODUCTO AGROPECUARIO O INDUSTRIAL",
            "valor": "DAÑO EN MATERIA PRIMA, PRODUCTO AGROPECUARIO O INDUSTRIAL"
        },
        {
            "nombre_campo": "DAÑO EN OBRAS DE UTILIDAD SOCIAL",
            "valor": "DAÑO EN OBRAS DE UTILIDAD SOCIAL"
        },
        {
            "nombre_campo": "DAÑO EN OBRAS O ELEMENTOS DE LOS SERVICIOS DE COMUNICACIONES, ENERGÍA Y COMBUSTIBLES",
            "valor": "DAÑO EN OBRAS O ELEMENTOS DE LOS SERVICIOS DE COMUNICACIONES, ENERGÍA Y COMBUSTIBLES"
        },
        {
            "nombre_campo": "DAÑOS EN LOS RECURSOS NATURALES Y ECOCIDIO",
            "valor": "DAÑOS EN LOS RECURSOS NATURALES Y ECOCIDIO"
        },
        {
            "nombre_campo": "DAÑOS O AGRAVIOS A PERSONAS O A COSAS DESTINADAS AL CULTO",
            "valor": "DAÑOS O AGRAVIOS A PERSONAS O A COSAS DESTINADAS AL CULTO"
        },
        {
            "nombre_campo": "DE LA PRESTACIÓN, ACCESO O USO ILEGALES DE LOS SERVICIOS DE TELECOMUNICACIONES",
            "valor": "DE LA PRESTACIÓN, ACCESO O USO ILEGALES DE LOS SERVICIOS DE TELECOMUNICACIONES"
        },
        {
            "nombre_campo": "DECLARAR QUE NO SE DARÁ CUARTEL (C.G)",
            "valor": "DECLARAR QUE NO SE DARÁ CUARTEL (C.G)"
        },
        {
            "nombre_campo": "DEFORESTACIÓN",
            "valor": "DEFORESTACIÓN"
        },
        {
            "nombre_campo": "DEFRAUDACIÓN DE FLUIDOS",
            "valor": "DEFRAUDACIÓN DE FLUIDOS"
        },
        {
            "nombre_campo": "DELITOS CONTRA EL ORDEN ECONÓMICO SOCIAL",
            "valor": "DELITOS CONTRA EL ORDEN ECONÓMICO SOCIAL"
        },
        {
            "nombre_campo": "DELITOS CONTRA EL PATRIMONIO CULTURAL SUMERGIDO",
            "valor": "DELITOS CONTRA EL PATRIMONIO CULTURAL SUMERGIDO"
        },
        {
            "nombre_campo": "DELITOS CONTRA EL PATRIMONIO ECONÓMICO",
            "valor": "DELITOS CONTRA EL PATRIMONIO ECONÓMICO"
        },
        {
            "nombre_campo": "DELITOS CONTRA EL RÉGIMEN CONSTITUCIONAL Y LEGAL",
            "valor": "DELITOS CONTRA EL RÉGIMEN CONSTITUCIONAL Y LEGAL"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA",
            "valor": "DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA EFICAZ Y RECTA IMPARTICIÓN DE JUSTICIA",
            "valor": "DELITOS CONTRA LA EFICAZ Y RECTA IMPARTICIÓN DE JUSTICIA"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA EXISTENCIA Y SEGURIDAD DEL ESTADO",
            "valor": "DELITOS CONTRA LA EXISTENCIA Y SEGURIDAD DEL ESTADO"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA FAMILIA",
            "valor": "DELITOS CONTRA LA FAMILIA"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA FE PÚBLICA",
            "valor": "DELITOS CONTRA LA FE PÚBLICA"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA INTEGRIDAD MORAL",
            "valor": "DELITOS CONTRA LA INTEGRIDAD MORAL"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA INVIABILIDAD DE HABITACIÓN O SITIO DE TRABAJO",
            "valor": "DELITOS CONTRA LA INVIABILIDAD DE HABITACIÓN O SITIO DE TRABAJO"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA LIBERTAD INDIVIDUAL Y OTRAS GARANTÍAS",
            "valor": "DELITOS CONTRA LA LIBERTAD INDIVIDUAL Y OTRAS GARANTÍAS"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA LIBERTAD, INTEGRIDAD Y FORMACIÓN SEXUALES",
            "valor": "DELITOS CONTRA LA LIBERTAD, INTEGRIDAD Y FORMACIÓN SEXUALES"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA SALUD PÚBLICA",
            "valor": "DELITOS CONTRA LA SALUD PÚBLICA"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA SEGURIDAD PÚBLICA",
            "valor": "DELITOS CONTRA LA SEGURIDAD PÚBLICA"
        },
        {
            "nombre_campo": "DELITOS CONTRA LA VIDA Y LA INTEGRIDAD PERSONAL",
            "valor": "DELITOS CONTRA LA VIDA Y LA INTEGRIDAD PERSONAL"
        },
        {
            "nombre_campo": "DELITOS CONTRA LOS DERECHOS DE AUTOR",
            "valor": "DELITOS CONTRA LOS DERECHOS DE AUTOR"
        },
        {
            "nombre_campo": "DELITOS CONTRA LOS RECURSOS NATURALES",
            "valor": "DELITOS CONTRA LOS RECURSOS NATURALES"
        },
        {
            "nombre_campo": "DELITOS CONTRA MECANISMOS DE PARTICIPACIÓN DEMOCRÁTICA",
            "valor": "DELITOS CONTRA MECANISMOS DE PARTICIPACIÓN DEMOCRÁTICA"
        },
        {
            "nombre_campo": "DELITOS CONTRA PERSONAS Y BIENES PROTEGIDOS POR EL DERECHO INTERNACIONAL HUMANITARIO",
            "valor": "DELITOS CONTRA PERSONAS Y BIENES PROTEGIDOS POR EL DERECHO INTERNACIONAL HUMANITARIO"
        },
        {
            "nombre_campo": "DELITOS POLÍTICOS",
            "valor": "DELITOS POLÍTICOS"
        },
        {
            "nombre_campo": "DENEGACIÓN DE INSCRIPCIÓN",
            "valor": "DENEGACIÓN DE INSCRIPCIÓN"
        },
        {
            "nombre_campo": "DEPORTACIÓN O TRASLADO FORZOSO DE POBLACIÓN (L.H)",
            "valor": "DEPORTACIÓN O TRASLADO FORZOSO DE POBLACIÓN (L.H)"
        },
        {
            "nombre_campo": "DEPORTACIÓN, EXPULSIÓN, TRASLADO O DESPLAZAMIENTO FORZADO DE POBLACIÓN CIVIL",
            "valor": "DEPORTACIÓN, EXPULSIÓN, TRASLADO O DESPLAZAMIENTO FORZADO DE POBLACIÓN CIVIL"
        },
        {
            "nombre_campo": "DERECHO INTERNACIONAL HUMANITARIO (DIH)",
            "valor": "DERECHO INTERNACIONAL HUMANITARIO (DIH)"
        },
        {
            "nombre_campo": "DESAPARICIÓN FORZADA",
            "valor": "DESAPARICIÓN FORZADA"
        },
        {
            "nombre_campo": "DESAPARICIÓN FORZADA DE PERSONAS (L.H)",
            "valor": "DESAPARICIÓN FORZADA DE PERSONAS (L.H)"
        },
        {
            "nombre_campo": "DESCONOCIMIENTO DEL HABEAS CORPUS",
            "valor": "DESCONOCIMIENTO DEL HABEAS CORPUS"
        },
        {
            "nombre_campo": "DESNUDEZ FORZADA EN PERSONA PROTEGIDA",
            "valor": "DESNUDEZ FORZADA EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "DESPLAZAMIENTO FORZADO",
            "valor": "DESPLAZAMIENTO FORZADO"
        },
        {
            "nombre_campo": "DESPOJO DE TIERRAS",
            "valor": "DESPOJO DE TIERRAS"
        },
        {
            "nombre_campo": "DESPOJO EN EL CAMPO DE BATALLA",
            "valor": "DESPOJO EN EL CAMPO DE BATALLA"
        },
        {
            "nombre_campo": "DESTINACIÓN ILEGAL DE COMBUSTIBLES",
            "valor": "DESTINACIÓN ILEGAL DE COMBUSTIBLES"
        },
        {
            "nombre_campo": "DESTINACIÓN ILÍCITA DE MUEBLES O INMUEBLES",
            "valor": "DESTINACIÓN ILÍCITA DE MUEBLES O INMUEBLES"
        },
        {
            "nombre_campo": "DESTINO DE RECURSOS DEL TESORO PARA EL ESTÍMULO O BENEFICIO INDEBIDO DE EXPLOTADORES Y COMERCIANTES DE METALES PRECIOSOS",
            "valor": "DESTINO DE RECURSOS DEL TESORO PARA EL ESTÍMULO O BENEFICIO INDEBIDO DE EXPLOTADORES Y COMERCIANTES DE METALES PRECIOSOS"
        },
        {
            "nombre_campo": "DESTRUCCIÓN DE BIENES E INSTALACIONES DE CARÁCTER SANITARIO",
            "valor": "DESTRUCCIÓN DE BIENES E INSTALACIONES DE CARÁCTER SANITARIO"
        },
        {
            "nombre_campo": "DESTRUCCIÓN DEL MEDIO AMBIENTE",
            "valor": "DESTRUCCIÓN DEL MEDIO AMBIENTE"
        },
        {
            "nombre_campo": "DESTRUCCIÓN O UTILIZACIÓN ILÍCITA DE BIENES CULTURALES Y DE LUGARES DE CULTO",
            "valor": "DESTRUCCIÓN O UTILIZACIÓN ILÍCITA DE BIENES CULTURALES Y DE LUGARES DE CULTO"
        },
        {
            "nombre_campo": "DESTRUCCIÓN Y APROPIACIÓN DE BIENES PROTEGIDOS",
            "valor": "DESTRUCCIÓN Y APROPIACIÓN DE BIENES PROTEGIDOS"
        },
        {
            "nombre_campo": "DESTRUCCIÓN, SUPRESIÓN U OCULTAMIENTO DE DOCUMENTO PRIVADO",
            "valor": "DESTRUCCIÓN, SUPRESIÓN U OCULTAMIENTO DE DOCUMENTO PRIVADO"
        },
        {
            "nombre_campo": "DESTRUCCIÓN, SUPRESIÓN U OCULTAMIENTO DE DOCUMENTO PÚBLICO",
            "valor": "DESTRUCCIÓN, SUPRESIÓN U OCULTAMIENTO DE DOCUMENTO PÚBLICO"
        },
        {
            "nombre_campo": "DESTRUIR O APODERARSE DE BIENES DE UN ADVERSARIO (C.G)",
            "valor": "DESTRUIR O APODERARSE DE BIENES DE UN ADVERSARIO (C.G)"
        },
        {
            "nombre_campo": "DETENCIÓN ARBITRARIA ESPECIAL",
            "valor": "DETENCIÓN ARBITRARIA ESPECIAL"
        },
        {
            "nombre_campo": "DETENCIÓN ILEGAL Y PRIVACIÓN DEL DEBIDO PROCESO",
            "valor": "DETENCIÓN ILEGAL Y PRIVACIÓN DEL DEBIDO PROCESO"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EL PERSONAL QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EL PERSONAL QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LA BENEFICENCIA (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LA BENEFICENCIA (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LA EDUCACIÓN (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LA EDUCACIÓN (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LA RELIGION (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LA RELIGION (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LAS ARTES (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LAS ARTES (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LAS CIENCIAS (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS DEDICADOS A LAS CIENCIAS (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA EDIFICIOS QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA HOSPITALES (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA HOSPITALES (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA INSTALACIONES PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA INSTALACIONES PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA LA POBLACIÓN CIVL (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA LA POBLACIÓN CIVL (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MATERIAL PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ(C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MATERIAL PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ(C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MATERIAL QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MATERIAL QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MEDIOS DE TRANSPORTE SANITARIOS QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MEDIOS DE TRANSPORTE SANITARIOS QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MONUMENTOS HISTÓRICOS (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA MONUMENTOS HISTÓRICOS (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA PERSONAL PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA PERSONAL PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA UNIDADES PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA UNIDADES PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA UNIDADES QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA UNIDADES QUE UTILICEN LOS EMBLEMAS DISTINTIVOS DE LOS CONVENIOS DE GINEBRA (C.G)"
        },
        {
            "nombre_campo": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA VEHICULOS PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)",
            "valor": "DIRIGIR INTENCIONALMENTE ATAQUES CONTRA VEHICULOS PARTICIPANTES EN UNA MISIÓN DE MANTENIMIENTO DE LA PAZ (C.G)"
        },
        {
            "nombre_campo": "DOMINIO DE LA ORGANIZACIÓN",
            "valor": "DOMINIO DE LA ORGANIZACIÓN"
        },
        {
            "nombre_campo": "EJECUCIONES SIN PREVIO JUICIO ANTE UN TRIBUNAL REGULARMENTE CONSTITUÍDO (C.G)",
            "valor": "EJECUCIONES SIN PREVIO JUICIO ANTE UN TRIBUNAL REGULARMENTE CONSTITUÍDO (C.G)"
        },
        {
            "nombre_campo": "ELEMENTOS Y FORMAS DE COMISIÓN DE LOS DELITOS",
            "valor": "ELEMENTOS Y FORMAS DE COMISIÓN DE LOS DELITOS"
        },
        {
            "nombre_campo": "EMBARAZO FORZADO (C.G)",
            "valor": "EMBARAZO FORZADO (C.G)"
        },
        {
            "nombre_campo": "EMBARAZO FORZADO (L.H)",
            "valor": "EMBARAZO FORZADO (L.H)"
        },
        {
            "nombre_campo": "EMBARAZO FORZADO EN PERSONA PROTEGIDA",
            "valor": "EMBARAZO FORZADO EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "EMISIÓN Y TRANSFERENCIA ILEGAL DE CHEQUE",
            "valor": "EMISIÓN Y TRANSFERENCIA ILEGAL DE CHEQUE"
        },
        {
            "nombre_campo": "EMISIONES ILEGALES",
            "valor": "EMISIONES ILEGALES"
        },
        {
            "nombre_campo": "ENCARCELACIÓN U OTRA PRIVACIÓN GRAVE DE LA LIBERTAD FÍSICA (L.H)",
            "valor": "ENCARCELACIÓN U OTRA PRIVACIÓN GRAVE DE LA LIBERTAD FÍSICA (L.H)"
        },
        {
            "nombre_campo": "ESCLAVITUD (L.H)",
            "valor": "ESCLAVITUD (L.H)"
        },
        {
            "nombre_campo": "ESCLAVITUD SEXUAL (C.G)",
            "valor": "ESCLAVITUD SEXUAL (C.G)"
        },
        {
            "nombre_campo": "ESCLAVITUD SEXUAL (L.H)",
            "valor": "ESCLAVITUD SEXUAL (L.H)"
        },
        {
            "nombre_campo": "ESCLAVITUD SEXUAL EN PERSONA PROTEGIDA",
            "valor": "ESCLAVITUD SEXUAL EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "ESPIONAJE",
            "valor": "ESPIONAJE"
        },
        {
            "nombre_campo": "ESTERILIZACIÓN FORZADA (C.G)",
            "valor": "ESTERILIZACIÓN FORZADA (C.G)"
        },
        {
            "nombre_campo": "ESTERILIZACIÓN FORZADA (L.H)",
            "valor": "ESTERILIZACIÓN FORZADA (L.H)"
        },
        {
            "nombre_campo": "ESTERILIZACIÓN FORZADA EN PERSONA PROTEGIDA",
            "valor": "ESTERILIZACIÓN FORZADA EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "EVASIÓN FISCAL",
            "valor": "EVASIÓN FISCAL"
        },
        {
            "nombre_campo": "EXISTENCIA, CONSTRUCCIÓN Y UTILIZACIÓN ILEGAL DE PISTAS DE ATERRIZAJE",
            "valor": "EXISTENCIA, CONSTRUCCIÓN Y UTILIZACIÓN ILEGAL DE PISTAS DE ATERRIZAJE"
        },
        {
            "nombre_campo": "EXPLOTACIÓN ILÍCITA DE YACIMIENTO MINERO Y OTROS MATERIALES",
            "valor": "EXPLOTACIÓN ILÍCITA DE YACIMIENTO MINERO Y OTROS MATERIALES"
        },
        {
            "nombre_campo": "EXPORTACIÓN O IMPORTACIÓN FICTICIA",
            "valor": "EXPORTACIÓN O IMPORTACIÓN FICTICIA"
        },
        {
            "nombre_campo": "EXTERMINIO (L.H)",
            "valor": "EXTERMINIO (L.H)"
        },
        {
            "nombre_campo": "FALSA DENUNCIA",
            "valor": "FALSA DENUNCIA"
        },
        {
            "nombre_campo": "FALSEDAD MATERIAL EN DOCUMENTO PÚBLICO",
            "valor": "FALSEDAD MATERIAL EN DOCUMENTO PÚBLICO"
        },
        {
            "nombre_campo": "FALSEDAD PARA OBTENER PRUEBA DE HECHO VERDADERO",
            "valor": "FALSEDAD PARA OBTENER PRUEBA DE HECHO VERDADERO"
        },
        {
            "nombre_campo": "FALSEDAD PERSONAL",
            "valor": "FALSEDAD PERSONAL"
        },
        {
            "nombre_campo": "FALSIFICACIÓN DE EFECTO OFICIAL TIMBRADO",
            "valor": "FALSIFICACIÓN DE EFECTO OFICIAL TIMBRADO"
        },
        {
            "nombre_campo": "FALSIFICACIÓN DE MONEDA NACIONAL O EXTRANJERA",
            "valor": "FALSIFICACIÓN DE MONEDA NACIONAL O EXTRANJERA"
        },
        {
            "nombre_campo": "FALSIFICACIÓN O USO FRAUDULENTO DE SELLO OFICIAL",
            "valor": "FALSIFICACIÓN O USO FRAUDULENTO DE SELLO OFICIAL"
        },
        {
            "nombre_campo": "FALSO TESTIMONIO",
            "valor": "FALSO TESTIMONIO"
        },
        {
            "nombre_campo": "FAVORECIMIENTO DE CONTRABANDO DE HIDROCARBUROS O SUS DERIVADOS",
            "valor": "FAVORECIMIENTO DE CONTRABANDO DE HIDROCARBUROS O SUS DERIVADOS"
        },
        {
            "nombre_campo": "FAVORECIMIENTO DE VOTO FRAUDULENTO",
            "valor": "FAVORECIMIENTO DE VOTO FRAUDULENTO"
        },
        {
            "nombre_campo": "FAVORECIMIENTO POR SERVIDOR PÚBLICO",
            "valor": "FAVORECIMIENTO POR SERVIDOR PÚBLICO"
        },
        {
            "nombre_campo": "FAVORECIMIENTO POR SERVIDOR PÚBLICO DE CONTRABANDO DE HIDROCARBUROS O SUS DERIVADOS",
            "valor": "FAVORECIMIENTO POR SERVIDOR PÚBLICO DE CONTRABANDO DE HIDROCARBUROS O SUS DERIVADOS"
        },
        {
            "nombre_campo": "FAVORECIMIENTO Y FACILITACIÓN DEL CONTRABANDO",
            "valor": "FAVORECIMIENTO Y FACILITACIÓN DEL CONTRABANDO"
        },
        {
            "nombre_campo": "FINANCIACIÓN DEL TERRORISMO Y DE GRUPOS DE DELINCUENCIA ORGANIZADA Y ADMINISTRACIÓN DE RECURSOS RELACIONADOS CON ACTIVIDADES TERRORISTAS Y DE LA DELINCUENCIA ORGANIZADA",
            "valor": "FINANCIACIÓN DEL TERRORISMO Y DE GRUPOS DE DELINCUENCIA ORGANIZADA Y ADMINISTRACIÓN DE RECURSOS RELACIONADOS CON ACTIVIDADES TERRORISTAS Y DE LA DELINCUENCIA ORGANIZADA"
        },
        {
            "nombre_campo": "FINANCIAMIENTO DE GRUPOS AL MARGEN DE LA LEY",
            "valor": "FINANCIAMIENTO DE GRUPOS AL MARGEN DE LA LEY"
        },
        {
            "nombre_campo": "FRAUDE DE SUBVENCIONES",
            "valor": "FRAUDE DE SUBVENCIONES"
        },
        {
            "nombre_campo": "FRAUDE EN INSCRIPCIÓN DE CÉDULAS",
            "valor": "FRAUDE EN INSCRIPCIÓN DE CÉDULAS"
        },
        {
            "nombre_campo": "FRAUDE PROCESAL",
            "valor": "FRAUDE PROCESAL"
        },
        {
            "nombre_campo": "FRAUDULENTA INTERNACIÓN EN ASILO, CLÍNICA O ESTABLECIMIENTO SIMILAR",
            "valor": "FRAUDULENTA INTERNACIÓN EN ASILO, CLÍNICA O ESTABLECIMIENTO SIMILAR"
        },
        {
            "nombre_campo": "FUGA DE PRESOS",
            "valor": "FUGA DE PRESOS"
        },
        {
            "nombre_campo": "GENOCIDIO",
            "valor": "GENOCIDIO"
        },
        {
            "nombre_campo": "GESTIÓN INDEBIDA DE RECURSOS SOCIALES",
            "valor": "GESTIÓN INDEBIDA DE RECURSOS SOCIALES"
        },
        {
            "nombre_campo": "HOMICIDIO",
            "valor": "HOMICIDIO"
        },
        {
            "nombre_campo": "HOMICIDIO (C.G)",
            "valor": "HOMICIDIO (C.G)"
        },
        {
            "nombre_campo": "HOMICIDIO CULPOSO",
            "valor": "HOMICIDIO CULPOSO"
        },
        {
            "nombre_campo": "HOMICIDIO EN PERSONA PROTEGIDA",
            "valor": "HOMICIDIO EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "HOSTIGAMIENTO",
            "valor": "HOSTIGAMIENTO"
        },
        {
            "nombre_campo": "HURTO",
            "valor": "HURTO"
        },
        {
            "nombre_campo": "HURTO CALIFICADO",
            "valor": "HURTO CALIFICADO"
        },
        {
            "nombre_campo": "HURTO POR MEDIOS INFORMÁTICOS Y SEMEJANTES",
            "valor": "HURTO POR MEDIOS INFORMÁTICOS Y SEMEJANTES"
        },
        {
            "nombre_campo": "ILÍCITA EXPLOTACIÓN COMERCIAL",
            "valor": "ILÍCITA EXPLOTACIÓN COMERCIAL"
        },
        {
            "nombre_campo": "ILÍCITO APROVECHAMIENTO DE RECURSOS NATURALES",
            "valor": "ILÍCITO APROVECHAMIENTO DE RECURSOS NATURALES"
        },
        {
            "nombre_campo": "IMPEDIMENTO O PERTURBACIÓN DE LA CELEBRACIÓN DE AUDIENCIAS PÚBLICAS",
            "valor": "IMPEDIMENTO O PERTURBACIÓN DE LA CELEBRACIÓN DE AUDIENCIAS PÚBLICAS"
        },
        {
            "nombre_campo": "IMPEDIMENTO Y PERTURBACIÓN DE CEREMONIA RELIGIOSA",
            "valor": "IMPEDIMENTO Y PERTURBACIÓN DE CEREMONIA RELIGIOSA"
        },
        {
            "nombre_campo": "INASISTENCIA ALIMENTARIA",
            "valor": "INASISTENCIA ALIMENTARIA"
        },
        {
            "nombre_campo": "INCENDIO",
            "valor": "INCENDIO"
        },
        {
            "nombre_campo": "INCESTO",
            "valor": "INCESTO"
        },
        {
            "nombre_campo": "INCITACIÓN A LA COMISIÓN DE DELITOS MILITARES",
            "valor": "INCITACIÓN A LA COMISIÓN DE DELITOS MILITARES"
        },
        {
            "nombre_campo": "INCORPORACIÓN FUNCIONAL Y MATERIAL A LA FUERZA PÚBLICA",
            "valor": "INCORPORACIÓN FUNCIONAL Y MATERIAL A LA FUERZA PÚBLICA"
        },
        {
            "nombre_campo": "INDUCCIÓN A LA PROSTITUCIÓN",
            "valor": "INDUCCIÓN A LA PROSTITUCIÓN"
        },
        {
            "nombre_campo": "INFIDELIDAD A LOS DEBERES PROFESIONALES",
            "valor": "INFIDELIDAD A LOS DEBERES PROFESIONALES"
        },
        {
            "nombre_campo": "INJURIA",
            "valor": "INJURIA"
        },
        {
            "nombre_campo": "INJURIA POR VÍAS DE HECHO",
            "valor": "INJURIA POR VÍAS DE HECHO"
        },
        {
            "nombre_campo": "INJURIA Y CALUMNIA INDIRECTAS",
            "valor": "INJURIA Y CALUMNIA INDIRECTAS"
        },
        {
            "nombre_campo": "INJURIAS O CALUMNIAS RECÍPROCAS",
            "valor": "INJURIAS O CALUMNIAS RECÍPROCAS"
        },
        {
            "nombre_campo": "INSTIGACIÓN A DELINQUIR",
            "valor": "INSTIGACIÓN A DELINQUIR"
        },
        {
            "nombre_campo": "INSTIGACIÓN A LA GUERRA",
            "valor": "INSTIGACIÓN A LA GUERRA"
        },
        {
            "nombre_campo": "INTERCEPTACIÓN DE DATOS INFORMÁTICOS",
            "valor": "INTERCEPTACIÓN DE DATOS INFORMÁTICOS"
        },
        {
            "nombre_campo": "INTERÉS INDEBIDO EN LA CELEBRACIÓN DE CONTRATOS",
            "valor": "INTERÉS INDEBIDO EN LA CELEBRACIÓN DE CONTRATOS"
        },
        {
            "nombre_campo": "INTERVENCIÓN EN POLÍTICA",
            "valor": "INTERVENCIÓN EN POLÍTICA"
        },
        {
            "nombre_campo": "INTIMIDACIÓN O AMENAZA CON ARMA DE FUEGO; ARMAS, ELEMENTOS O DISPOSITIVOS MENOS LETALES; ARMAS DE FUEGO HECHIZAS; Y ARMA BLANCA",
            "valor": "INTIMIDACIÓN O AMENAZA CON ARMA DE FUEGO; ARMAS, ELEMENTOS O DISPOSITIVOS MENOS LETALES; ARMAS DE FUEGO HECHIZAS; Y ARMA BLANCA"
        },
        {
            "nombre_campo": "INVASIÓN DE ÁREAS DE ESPECIAL IMPORTANCIA ECOLÓGICA",
            "valor": "INVASIÓN DE ÁREAS DE ESPECIAL IMPORTANCIA ECOLÓGICA"
        },
        {
            "nombre_campo": "INVASIÓN DE TIERRAS",
            "valor": "INVASIÓN DE TIERRAS"
        },
        {
            "nombre_campo": "IRRESPETO A CADÁVERES",
            "valor": "IRRESPETO A CADÁVERES"
        },
        {
            "nombre_campo": "LAVADO DE ACTIVOS",
            "valor": "LAVADO DE ACTIVOS"
        },
        {
            "nombre_campo": "LESIONES AL FETO",
            "valor": "LESIONES AL FETO"
        },
        {
            "nombre_campo": "LESIONES CON AGENTES QUÍMICOS, ÁCIDO Y/O SUSTANCIAS SIMILARES",
            "valor": "LESIONES CON AGENTES QUÍMICOS, ÁCIDO Y/O SUSTANCIAS SIMILARES"
        },
        {
            "nombre_campo": "LESIONES CON SUSTANCIAS MODELANTES NO PERMITIDAS",
            "valor": "LESIONES CON SUSTANCIAS MODELANTES NO PERMITIDAS"
        },
        {
            "nombre_campo": "LESIONES CULPOSAS",
            "valor": "LESIONES CULPOSAS"
        },
        {
            "nombre_campo": "LESIONES CULPOSAS AL FETO",
            "valor": "LESIONES CULPOSAS AL FETO"
        },
        {
            "nombre_campo": "LESIONES EN PERSONA PROTEGIDA",
            "valor": "LESIONES EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "LESIONES PERSONALES",
            "valor": "LESIONES PERSONALES"
        },
        {
            "nombre_campo": "MALTRATO MEDIANTE RESTRICCIÓN A LA LIBERTAD FÍSICA",
            "valor": "MALTRATO MEDIANTE RESTRICCIÓN A LA LIBERTAD FÍSICA"
        },
        {
            "nombre_campo": "MALVERSACIÓN Y DILAPIDACIÓN DE BIENES",
            "valor": "MALVERSACIÓN Y DILAPIDACIÓN DE BIENES"
        },
        {
            "nombre_campo": "MALVERSACIÓN Y DILAPIDACIÓN DE BIENES DE FAMILIARES",
            "valor": "MALVERSACIÓN Y DILAPIDACIÓN DE BIENES DE FAMILIARES"
        },
        {
            "nombre_campo": "MENOSCABO DE LA INTEGRIDAD NACIONAL",
            "valor": "MENOSCABO DE LA INTEGRIDAD NACIONAL"
        },
        {
            "nombre_campo": "MINERÍA ILEGAL",
            "valor": "MINERÍA ILEGAL"
        },
        {
            "nombre_campo": "MORA EN LA ENTREGA DE DOCUMENTOS RELACIONADOS CON UNA VOTACIÓN",
            "valor": "MORA EN LA ENTREGA DE DOCUMENTOS RELACIONADOS CON UNA VOTACIÓN"
        },
        {
            "nombre_campo": "MUERTE DE HIJO FRUTO DE ACCESO CARNAL VIOLENTO, ABUSIVO, O DE INSEMINACIÓN ARTIFICIAL O TRANSFERENCIA DE ÓVULO FECUNDADO NO CONSENTIDAS",
            "valor": "MUERTE DE HIJO FRUTO DE ACCESO CARNAL VIOLENTO, ABUSIVO, O DE INSEMINACIÓN ARTIFICIAL O TRANSFERENCIA DE ÓVULO FECUNDADO NO CONSENTIDAS"
        },
        {
            "nombre_campo": "MUERTES Y DESAPARICIONES FORZADAS DE INDÍGENAS, CAMPESINOS Y OTROS CIVILES",
            "valor": "MUERTES Y DESAPARICIONES FORZADAS DE INDÍGENAS, CAMPESINOS Y OTROS CIVILES"
        },
        {
            "nombre_campo": "MUTILACIONES (C.G)",
            "valor": "MUTILACIONES (C.G)"
        },
        {
            "nombre_campo": "OBSTACULIZACIÓN DE TAREAS SANITARIAS Y HUMANITARIAS",
            "valor": "OBSTACULIZACIÓN DE TAREAS SANITARIAS Y HUMANITARIAS"
        },
        {
            "nombre_campo": "OBSTACULIZACIÓN ILEGÍTIMA DE SISTEMA INFORMÁTICO O RED DE TELECOMUNICACIÓN",
            "valor": "OBSTACULIZACIÓN ILEGÍTIMA DE SISTEMA INFORMÁTICO O RED DE TELECOMUNICACIÓN"
        },
        {
            "nombre_campo": "OBSTRUCCIÓN A LA FUNCIÓN PÚBLICA",
            "valor": "OBSTRUCCIÓN A LA FUNCIÓN PÚBLICA"
        },
        {
            "nombre_campo": "OBSTRUCCIÓN A VÍAS PÚBLICAS QUE AFECTEN EL ORDEN PÚBLICO",
            "valor": "OBSTRUCCIÓN A VÍAS PÚBLICAS QUE AFECTEN EL ORDEN PÚBLICO"
        },
        {
            "nombre_campo": "OBSTRUCCIÓN DE OBRAS DE DEFENSA O DE ASISTENCIA",
            "valor": "OBSTRUCCIÓN DE OBRAS DE DEFENSA O DE ASISTENCIA"
        },
        {
            "nombre_campo": "OBTENCIÓN DE DOCUMENTO PÚBLICO FALSO",
            "valor": "OBTENCIÓN DE DOCUMENTO PÚBLICO FALSO"
        },
        {
            "nombre_campo": "OCULTAMIENTO DE CADÁVERES",
            "valor": "OCULTAMIENTO DE CADÁVERES"
        },
        {
            "nombre_campo": "OCULTAMIENTO, ALTERACIÓN O DESTRUCCIÓN DE ELEMENTO MATERIAL PROBATORIO",
            "valor": "OCULTAMIENTO, ALTERACIÓN O DESTRUCCIÓN DE ELEMENTO MATERIAL PROBATORIO"
        },
        {
            "nombre_campo": "OCULTAMIENTO, RETENCIÓN Y POSESIÓN ILÍCITA DE CÉDULA",
            "valor": "OCULTAMIENTO, RETENCIÓN Y POSESIÓN ILÍCITA DE CÉDULA"
        },
        {
            "nombre_campo": "OCUPACIÓN ARMADA DE TERRITORIOS INDÍGENAS Y AFRODESCENDIENTES",
            "valor": "OCUPACIÓN ARMADA DE TERRITORIOS INDÍGENAS Y AFRODESCENDIENTES"
        },
        {
            "nombre_campo": "OCUPACIÓN ILÍCITA DE PARQUES Y ZONAS DE RESERVA FORESTAL",
            "valor": "OCUPACIÓN ILÍCITA DE PARQUES Y ZONAS DE RESERVA FORESTAL"
        },
        {
            "nombre_campo": "OFENSA A DIPLOMÁTICOS",
            "valor": "OFENSA A DIPLOMÁTICOS"
        },
        {
            "nombre_campo": "OFRECIMIENTO ENGAÑOSO DE PRODUCTOS Y SERVICIOS",
            "valor": "OFRECIMIENTO ENGAÑOSO DE PRODUCTOS Y SERVICIOS"
        },
        {
            "nombre_campo": "OFRECIMIENTO, VENTA O COMPRA DE INSTRUMENTO APTO PARA INTERCEPTAR LA COMUNICACIÓN PRIVADA ENTRE PERSONAS",
            "valor": "OFRECIMIENTO, VENTA O COMPRA DE INSTRUMENTO APTO PARA INTERCEPTAR LA COMUNICACIÓN PRIVADA ENTRE PERSONAS"
        },
        {
            "nombre_campo": "OMISIÓN DE APOYO",
            "valor": "OMISIÓN DE APOYO"
        },
        {
            "nombre_campo": "OMISIÓN DE CONTROL",
            "valor": "OMISIÓN DE CONTROL"
        },
        {
            "nombre_campo": "OMISIÓN DE CONTROL EN EL SECTOR DE LA SALUD",
            "valor": "OMISIÓN DE CONTROL EN EL SECTOR DE LA SALUD"
        },
        {
            "nombre_campo": "OMISIÓN DE DENUNCIA",
            "valor": "OMISIÓN DE DENUNCIA"
        },
        {
            "nombre_campo": "OMISIÓN DE DENUNCIA DE PARTICULAR",
            "valor": "OMISIÓN DE DENUNCIA DE PARTICULAR"
        },
        {
            "nombre_campo": "OMISIÓN DE MEDIDAS DE PROTECCIÓN A LA POBLACIÓN CIVIL",
            "valor": "OMISIÓN DE MEDIDAS DE PROTECCIÓN A LA POBLACIÓN CIVIL"
        },
        {
            "nombre_campo": "OMISIÓN DE MEDIDAS DE SOCORRO Y ASISTENCIA HUMANITARIA",
            "valor": "OMISIÓN DE MEDIDAS DE SOCORRO Y ASISTENCIA HUMANITARIA"
        },
        {
            "nombre_campo": "OMISIÓN DE REPORTES SOBRE TRANSACCIONES EN EFECTIVO, MOVILIZACIÓN O ALMACENAMIENTO DE DINERO EN EFECTIVO",
            "valor": "OMISIÓN DE REPORTES SOBRE TRANSACCIONES EN EFECTIVO, MOVILIZACIÓN O ALMACENAMIENTO DE DINERO EN EFECTIVO"
        },
        {
            "nombre_campo": "OMISIÓN DE SOCORRO",
            "valor": "OMISIÓN DE SOCORRO"
        },
        {
            "nombre_campo": "OMISIÓN DEL AGENTE RETENEDOR O RECAUDADOR",
            "valor": "OMISIÓN DEL AGENTE RETENEDOR O RECAUDADOR"
        },
        {
            "nombre_campo": "ORDEN DE DESPLAZAMIENTO FRENTE A PERSONAS CONSIDERADAS INFORMANTES, COLABORADORAS O ENEMIGAS (C.G)",
            "valor": "ORDEN DE DESPLAZAMIENTO FRENTE A PERSONAS CONSIDERADAS INFORMANTES, COLABORADORAS O ENEMIGAS (C.G)"
        },
        {
            "nombre_campo": "PÁNICO",
            "valor": "PÁNICO"
        },
        {
            "nombre_campo": "PÁNICO ECONÓMICO",
            "valor": "PÁNICO ECONÓMICO"
        },
        {
            "nombre_campo": "PARTICIPACIÓN DIRECTA EN HOSTILIDADES",
            "valor": "PARTICIPACIÓN DIRECTA EN HOSTILIDADES"
        },
        {
            "nombre_campo": "PARTO O ABORTO PRETERINTENCIONAL",
            "valor": "PARTO O ABORTO PRETERINTENCIONAL"
        },
        {
            "nombre_campo": "PECULADO",
            "valor": "PECULADO"
        },
        {
            "nombre_campo": "PECULADO CULPOSO",
            "valor": "PECULADO CULPOSO"
        },
        {
            "nombre_campo": "PECULADO CULPOSO FRENTE A RECURSOS DE LA SEGURIDAD SOCIAL INTEGRAL",
            "valor": "PECULADO CULPOSO FRENTE A RECURSOS DE LA SEGURIDAD SOCIAL INTEGRAL"
        },
        {
            "nombre_campo": "PECULADO POR APLICACIÓN OFICIAL DIFERENTE",
            "valor": "PECULADO POR APLICACIÓN OFICIAL DIFERENTE"
        },
        {
            "nombre_campo": "PECULADO POR APLICACIÓN OFICIAL DIFERENTE FRENTE A RECURSOS DE LA SEGURIDAD SOCIAL",
            "valor": "PECULADO POR APLICACIÓN OFICIAL DIFERENTE FRENTE A RECURSOS DE LA SEGURIDAD SOCIAL"
        },
        {
            "nombre_campo": "PECULADO POR APROPIACIÓN",
            "valor": "PECULADO POR APROPIACIÓN"
        },
        {
            "nombre_campo": "PECULADO POR USO",
            "valor": "PECULADO POR USO"
        },
        {
            "nombre_campo": "PERFIDIA",
            "valor": "PERFIDIA"
        },
        {
            "nombre_campo": "PERTURBACIÓN DE ACTOS OFICIALES",
            "valor": "PERTURBACIÓN DE ACTOS OFICIALES"
        },
        {
            "nombre_campo": "PERTURBACIÓN DE CERTAMEN DEMOCRÁTICO",
            "valor": "PERTURBACIÓN DE CERTAMEN DEMOCRÁTICO"
        },
        {
            "nombre_campo": "PERTURBACIÓN DE LA POSESIÓN SOBRE INMUEBLE",
            "valor": "PERTURBACIÓN DE LA POSESIÓN SOBRE INMUEBLE"
        },
        {
            "nombre_campo": "PERTURBACIÓN EN SERVICIO DE TRANSPORTE PÚBLICO, COLECTIVO U OFICIAL",
            "valor": "PERTURBACIÓN EN SERVICIO DE TRANSPORTE PÚBLICO, COLECTIVO U OFICIAL"
        },
        {
            "nombre_campo": "REPRESALIAS",
            "valor": "REPRESALIAS"
        },
        {
            "nombre_campo": "SABOTAJE",
            "valor": "SABOTAJE"
        },
        {
            "nombre_campo": "SECUESTRO",
            "valor": "SECUESTRO"
        },
        {
            "nombre_campo": "SECUESTRO EXTORSIVO",
            "valor": "SECUESTRO EXTORSIVO"
        },
        {
            "nombre_campo": "SECUESTRO SIMPLE",
            "valor": "SECUESTRO SIMPLE"
        },
        {
            "nombre_campo": "SEDICIÓN",
            "valor": "SEDICIÓN"
        },
        {
            "nombre_campo": "SEDUCCIÓN, USURPACIÓN Y RETENCIÓN ILEGAL DE MANDO",
            "valor": "SEDUCCIÓN, USURPACIÓN Y RETENCIÓN ILEGAL DE MANDO"
        },
        {
            "nombre_campo": "SIMULACIÓN DE INVESTIDURA O CARGO",
            "valor": "SIMULACIÓN DE INVESTIDURA O CARGO"
        },
        {
            "nombre_campo": "SINIESTRO O DAÑO DE NAVE",
            "valor": "SINIESTRO O DAÑO DE NAVE"
        },
        {
            "nombre_campo": "SOBORNO",
            "valor": "SOBORNO"
        },
        {
            "nombre_campo": "SOBORNO EN LA ACTUACIÓN PENAL",
            "valor": "SOBORNO EN LA ACTUACIÓN PENAL"
        },
        {
            "nombre_campo": "SOBORNO TRANSNACIONAL",
            "valor": "SOBORNO TRANSNACIONAL"
        },
        {
            "nombre_campo": "SOMETER A LAS PERSONAS QUE ESTÉN EN PODER DE OTRA PARTE DEL CONFLICTO A MUTILACIONES FÍSICAS O A EXPERIMENTOS MÉDICOS O CIENTÍFICOS (C.G)",
            "valor": "SOMETER A LAS PERSONAS QUE ESTÉN EN PODER DE OTRA PARTE DEL CONFLICTO A MUTILACIONES FÍSICAS O A EXPERIMENTOS MÉDICOS O CIENTÍFICOS (C.G)"
        },
        {
            "nombre_campo": "SUPLANTACIÓN DE SITIOS WEB PARA CAPTURAR DATOS PERSONALES",
            "valor": "SUPLANTACIÓN DE SITIOS WEB PARA CAPTURAR DATOS PERSONALES"
        },
        {
            "nombre_campo": "SUPRESIÓN, ALTERACIÓN O SUPOSICIÓN DEL ESTADO CIVIL",
            "valor": "SUPRESIÓN, ALTERACIÓN O SUPOSICIÓN DEL ESTADO CIVIL"
        },
        {
            "nombre_campo": "SUSTRACCIÓN DE BIEN PROPIO",
            "valor": "SUSTRACCIÓN DE BIEN PROPIO"
        },
        {
            "nombre_campo": "TENENCIA, FABRICACIÓN Y TRÁFICO DE SUSTANCIAS U OBJETOS PELIGROSOS",
            "valor": "TENENCIA, FABRICACIÓN Y TRÁFICO DE SUSTANCIAS U OBJETOS PELIGROSOS"
        },
        {
            "nombre_campo": "TERRORISMO",
            "valor": "TERRORISMO"
        },
        {
            "nombre_campo": "TESTAFERRATO",
            "valor": "TESTAFERRATO"
        },
        {
            "nombre_campo": "TOMA DE REHENES",
            "valor": "TOMA DE REHENES"
        },
        {
            "nombre_campo": "TOMA DE REHENES (C.G)",
            "valor": "TOMA DE REHENES (C.G)"
        },
        {
            "nombre_campo": "TOMA DE REHENES, GRAVES PRIVACIONES DE LA LIBERTAD Y OTROS CRÍMENES CONCURRENTES COMETIDOS POR LAS FARC-EP",
            "valor": "TOMA DE REHENES, GRAVES PRIVACIONES DE LA LIBERTAD Y OTROS CRÍMENES CONCURRENTES COMETIDOS POR LAS FARC-EP"
        },
        {
            "nombre_campo": "TORTURA",
            "valor": "TORTURA"
        },
        {
            "nombre_campo": "TORTURA (C.G)",
            "valor": "TORTURA (C.G)"
        },
        {
            "nombre_campo": "TORTURA (L.H)",
            "valor": "TORTURA (L.H)"
        },
        {
            "nombre_campo": "TORTURA EN PERSONA PROTEGIDA",
            "valor": "TORTURA EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "TRÁFICO DE FAUNA",
            "valor": "TRÁFICO DE FAUNA"
        },
        {
            "nombre_campo": "TRÁFICO DE INFLUENCIAS DE SERVIDOR PÚBLICO",
            "valor": "TRÁFICO DE INFLUENCIAS DE SERVIDOR PÚBLICO"
        },
        {
            "nombre_campo": "TRÁFICO DE MIGRANTES",
            "valor": "TRÁFICO DE MIGRANTES"
        },
        {
            "nombre_campo": "TRAFICO DE MONEDA FALSIFICADA",
            "valor": "TRAFICO DE MONEDA FALSIFICADA"
        },
        {
            "nombre_campo": "TRÁFICO DE NIÑAS, NIÑOS Y ADOLESCENTES",
            "valor": "TRÁFICO DE NIÑAS, NIÑOS Y ADOLESCENTES"
        },
        {
            "nombre_campo": "TRÁFICO DE SUSTANCIAS PARA EL PROCESAMIENTO DE NARCÓTICOS",
            "valor": "TRÁFICO DE SUSTANCIAS PARA EL PROCESAMIENTO DE NARCÓTICOS"
        },
        {
            "nombre_campo": "TRÁFICO, ELABORACIÓN Y TENENCIA DE ELEMENTOS DESTINADOS A LA FALSIFICACIÓN DE MONEDA",
            "valor": "TRÁFICO, ELABORACIÓN Y TENENCIA DE ELEMENTOS DESTINADOS A LA FALSIFICACIÓN DE MONEDA"
        },
        {
            "nombre_campo": "TRÁFICO, FABRICACIÓN O PORTE DE ESTUPEFACIENTES",
            "valor": "TRÁFICO, FABRICACIÓN O PORTE DE ESTUPEFACIENTES"
        },
        {
            "nombre_campo": "TRANSFERENCIA NO CONSENTIDA DE ACTIVOS",
            "valor": "TRANSFERENCIA NO CONSENTIDA DE ACTIVOS"
        },
        {
            "nombre_campo": "TRASLADO FORZADO",
            "valor": "TRASLADO FORZADO"
        },
        {
            "nombre_campo": "TRASLADO FORZOSO DE POBLACIÓN",
            "valor": "TRASLADO FORZOSO DE POBLACIÓN"
        },
        {
            "nombre_campo": "TRATA DE PERSONAS",
            "valor": "TRATA DE PERSONAS"
        },
        {
            "nombre_campo": "TRATA DE PERSONAS EN PERSONA PROTEGIDA CON FINES DE EXPLOTACIÓN SEXUAL",
            "valor": "TRATA DE PERSONAS EN PERSONA PROTEGIDA CON FINES DE EXPLOTACIÓN SEXUAL"
        },
        {
            "nombre_campo": "TRATOS CRUELES (C.G)",
            "valor": "TRATOS CRUELES (C.G)"
        },
        {
            "nombre_campo": "TRATOS HUMILLANTES Y DEGRADANTES (C.G)",
            "valor": "TRATOS HUMILLANTES Y DEGRADANTES (C.G)"
        },
        {
            "nombre_campo": "TRATOS INHUMANOS Y DEGRADANTES",
            "valor": "TRATOS INHUMANOS Y DEGRADANTES"
        },
        {
            "nombre_campo": "TRATOS INHUMANOS Y DEGRADANTES Y EXPERIMENTOS BIOLÓGICOS EN PERSONA PROTEGIDA",
            "valor": "TRATOS INHUMANOS Y DEGRADANTES Y EXPERIMENTOS BIOLÓGICOS EN PERSONA PROTEGIDA"
        },
        {
            "nombre_campo": "URBANIZACIÓN ILEGAL",
            "valor": "URBANIZACIÓN ILEGAL"
        },
        {
            "nombre_campo": "USO DE DOCUMENTO FALSO",
            "valor": "USO DE DOCUMENTO FALSO"
        },
        {
            "nombre_campo": "USO DE MENORES DE EDAD EN LA COMISIÓN DE DELITOS",
            "valor": "USO DE MENORES DE EDAD EN LA COMISIÓN DE DELITOS"
        },
        {
            "nombre_campo": "USO DE SOFTWARE MALICIOSO",
            "valor": "USO DE SOFTWARE MALICIOSO"
        },
        {
            "nombre_campo": "USO, CONSTRUCCIÓN, COMERCIALIZACIÓN Y/O TENENCIA DE SEMISUMERGIBLES O SUMERGIBLES",
            "valor": "USO, CONSTRUCCIÓN, COMERCIALIZACIÓN Y/O TENENCIA DE SEMISUMERGIBLES O SUMERGIBLES"
        },
        {
            "nombre_campo": "USURA",
            "valor": "USURA"
        },
        {
            "nombre_campo": "USURPACIÓN DE FUNCIONES PÚBLICAS",
            "valor": "USURPACIÓN DE FUNCIONES PÚBLICAS"
        },
        {
            "nombre_campo": "USURPACIÓN DE INMUEBLES",
            "valor": "USURPACIÓN DE INMUEBLES"
        },
        {
            "nombre_campo": "USURPACIÓN Y ABUSO DE FUNCIONES PÚBLICAS CON FINES TERRORISTAS",
            "valor": "USURPACIÓN Y ABUSO DE FUNCIONES PÚBLICAS CON FINES TERRORISTAS"
        },
        {
            "nombre_campo": "UTILIZACIÓN DE ASUNTO SOMETIDO A SECRETO O RESERVA",
            "valor": "UTILIZACIÓN DE ASUNTO SOMETIDO A SECRETO O RESERVA"
        },
        {
            "nombre_campo": "UTILIZACIÓN DE MEDIOS Y MÉTODOS DE GUERRA ILÍCITOS",
            "valor": "UTILIZACIÓN DE MEDIOS Y MÉTODOS DE GUERRA ILÍCITOS"
        },
        {
            "nombre_campo": "UTILIZACIÓN ILEGAL DE UNIFORMES E INSIGNIAS",
            "valor": "UTILIZACIÓN ILEGAL DE UNIFORMES E INSIGNIAS"
        },
        {
            "nombre_campo": "UTILIZACIÓN ILÍCITA DE REDES DE COMUNICACIONES",
            "valor": "UTILIZACIÓN ILÍCITA DE REDES DE COMUNICACIONES"
        },
        {
            "nombre_campo": "UTILIZACIÓN INDEBIDA DE FONDOS CAPTADOS DEL PÚBLICO",
            "valor": "UTILIZACIÓN INDEBIDA DE FONDOS CAPTADOS DEL PÚBLICO"
        },
        {
            "nombre_campo": "UTILIZACIÓN INDEBIDA DE INFLUENCIAS DERIVADAS DEL EJERCICIO DE FUNCIÓN PÚBLICA",
            "valor": "UTILIZACIÓN INDEBIDA DE INFLUENCIAS DERIVADAS DEL EJERCICIO DE FUNCIÓN PÚBLICA"
        },
        {
            "nombre_campo": "UTILIZACIÓN INDEBIDA DE INFORMACIÓN OBTENIDA EN EL EJERCICIO DE FUNCIÓN PÚBLICA",
            "valor": "UTILIZACIÓN INDEBIDA DE INFORMACIÓN OBTENIDA EN EL EJERCICIO DE FUNCIÓN PÚBLICA"
        },
        {
            "nombre_campo": "UTILIZACIÓN INDEBIDA DE INFORMACIÓN OFICIAL PRIVILEGIADA",
            "valor": "UTILIZACIÓN INDEBIDA DE INFORMACIÓN OFICIAL PRIVILEGIADA"
        },
        {
            "nombre_campo": "UTILIZACIÓN, RECLUTAMIENTO O ALISTAMIENTO DE NIÑOS Y NIÑAS",
            "valor": "UTILIZACIÓN, RECLUTAMIENTO O ALISTAMIENTO DE NIÑOS Y NIÑAS"
        },
        {
            "nombre_campo": "VIOLACIÓN (L.H)",
            "valor": "VIOLACIÓN (L.H)"
        },
        {
            "nombre_campo": "VIOLACIÓN A LA LIBERTAD RELIGIOSA",
            "valor": "VIOLACIÓN A LA LIBERTAD RELIGIOSA"
        },
        {
            "nombre_campo": "VIOLACIÓN DE DATOS PERSONALES",
            "valor": "VIOLACIÓN DE DATOS PERSONALES"
        },
        {
            "nombre_campo": "VIOLACIÓN DE HABITACIÓN AJENA",
            "valor": "VIOLACIÓN DE HABITACIÓN AJENA"
        },
        {
            "nombre_campo": "VIOLACIÓN DE HABITACIÓN AJENA POR SERVIDOR PÚBLICO",
            "valor": "VIOLACIÓN DE HABITACIÓN AJENA POR SERVIDOR PÚBLICO"
        },
        {
            "nombre_campo": "VIOLACIÓN DE INMUNIDAD DIPLOMÁTICA",
            "valor": "VIOLACIÓN DE INMUNIDAD DIPLOMÁTICA"
        },
        {
            "nombre_campo": "VIOLACIÓN DE LA LIBERTAD DE TRABAJO",
            "valor": "VIOLACIÓN DE LA LIBERTAD DE TRABAJO"
        },
        {
            "nombre_campo": "VIOLACIÓN DE LOS DERECHOS DE REUNIÓN Y ASOCIACIÓN",
            "valor": "VIOLACIÓN DE LOS DERECHOS DE REUNIÓN Y ASOCIACIÓN"
        },
        {
            "nombre_campo": "VIOLACIÓN DE TREGUA O ARMISTICIO",
            "valor": "VIOLACIÓN DE TREGUA O ARMISTICIO"
        },
        {
            "nombre_campo": "VIOLACIÓN DEL RÉGIMEN LEGAL O CONSTITUCIONAL DE INHABILIDADES E INCOMPATIBILIDADES",
            "valor": "VIOLACIÓN DEL RÉGIMEN LEGAL O CONSTITUCIONAL DE INHABILIDADES E INCOMPATIBILIDADES"
        },
        {
            "nombre_campo": "VIOLACIÓN DIRECTA DE LA CONSTITUCIÓN",
            "valor": "VIOLACIÓN DIRECTA DE LA CONSTITUCIÓN"
        },
        {
            "nombre_campo": "VIOLACIÓN ILÍCITA DE COMUNICACIONES",
            "valor": "VIOLACIÓN ILÍCITA DE COMUNICACIONES"
        },
        {
            "nombre_campo": "VIOLACIÓN ILÍCITA DE COMUNICACIONES O CORRESPONDENCIA DE CARÁCTER OFICIAL",
            "valor": "VIOLACIÓN ILÍCITA DE COMUNICACIONES O CORRESPONDENCIA DE CARÁCTER OFICIAL"
        },
        {
            "nombre_campo": "VIOLENCIA CONTRA SERVIDOR PÚBLICO",
            "valor": "VIOLENCIA CONTRA SERVIDOR PÚBLICO"
        },
        {
            "nombre_campo": "VIOLENCIA INTRAFAMILIAR",
            "valor": "VIOLENCIA INTRAFAMILIAR"
        },
        {
            "nombre_campo": "VIOLENCIA SEXUAL",
            "valor": "VIOLENCIA SEXUAL"
        },
        {
            "nombre_campo": "VIOLENCIA SEXUAL, REPRODUCTIVA Y OTROS MOTIVADOS EN LA ORIENTACIÓN SEXUAL O IDENTIDAD DE GÉNERO",
            "valor": "VIOLENCIA SEXUAL, REPRODUCTIVA Y OTROS MOTIVADOS EN LA ORIENTACIÓN SEXUAL O IDENTIDAD DE GÉNERO"
        },
        {
            "nombre_campo": "VOTO FRAUDULENTO",
            "valor": "VOTO FRAUDULENTO"
        }
    ];

export default delitos;